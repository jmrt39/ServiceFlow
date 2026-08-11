import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma.js";
import jwt from 'jsonwebtoken';

interface RegisterInput {
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export async function login(data: LoginInput){
    if(!data.email || !data.password){
        throw new Error("Email and Password are required");
    }

    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if(!user) {
        throw new Error("Invalid email or password");
    }

    if(user.status !== "ACTIVE"){
        throw new Error("Account is not active");
    }

    const passwordValid = await bcrypt.compare(
        data.password,
        user.passwordHash
    );

    if(!passwordValid){
        throw new Error("Invalid email or password")
    }

    const userRoles = await prisma.userRole.findMany({
        where: {
            userId: user.id,
        },
        include: {
            role: {
                include: {
                    permissions: {
                        include: {
                            permission: true
                        }
                    }
                }
            }
        }
    });

    const permissions = userRoles.flatMap(
        userRole => 
                userRole.role.permissions.map(
                    rolePermission => rolePermission.permission.name
                )
    );

    const payload = {
        userId: user.id,
        companyId: user.companyId
    }

    const token = jwt.sign(
        {
            userId: user.id,
            companyId: user.companyId,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1h",
        }
    );

    return {
        token, 
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            companyId: user.companyId
        },
        permissions
    }
}

export async function register(data: RegisterInput) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const ownerRole = await prisma.role.findFirst({
    where: {
      name: "Owner",
      companyId: null,
      isSystemRole: true,
    },
  });

  if (!ownerRole) {
    throw new Error("Owner role missing");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const result = await prisma.$transaction(async (tx) => {
    const company = await tx.company.create({
      data: {
        name: data.companyName,
      },
    });

    const user = await tx.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        passwordHash,
        companyId: company.id,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        companyId: true,
        status: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true
      }
    });

    await tx.userRole.create({
      data: {
        userId: user.id,
        roleId: ownerRole.id,
      },
    });

    return {
      company,
      user,
    };
  });

  return result;
}