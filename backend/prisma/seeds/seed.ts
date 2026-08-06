import { prisma } from "../../src/lib/prisma";
import bcrypt from "bcrypt";


async function main() {


  console.log("Starting seed...");

  const company = await prisma.company.upsert({
    where:{
      name:"Demo Service Company"
    },

    update:{},

    create:{
      name:"Demo Service Company"
    }
});

const passwordHash = await bcrypt.hash(
  "Password123!",
  10
);


const user = await prisma.user.upsert({

  where:{
    email:"owner@serviceflow.com"
  },

  update:{},

  create:{

    email:"owner@serviceflow.com",

    firstName:"Demo",

    lastName:"Owner",

    passwordHash,

    companyId:company.id

  }

});
  // STEP 1: Create permissions

  const permissionRecords: Record<string, any> = {};

  const permissions = [

  "company.manage",

  "user.create",
  "user.update",
  "user.delete",

  "role.manage",

  "customer.create",
  "customer.view",
  "customer.update",
  "customer.delete",

  "job.create",
  "job.view",
  "job.assign",
  "job.update",
  "job.complete",

  "invoice.create",
  "invoice.view",

  "report.view"

];


  for (const permission of permissions) {

    const record = await prisma.permission.upsert({

      where:{
        name: permission
      },

      update:{},

      create:{
        name: permission
      }

    });


    permissionRecords[permission] = record;

  }



  // STEP 2: Create roles

  const roles: Record<string, any> = {};


  const systemRoles = [
    "Owner",
    "Admin",
    "Dispatcher",
    "Technician",
    "Accounting"
  ];


  for(const roleName of systemRoles){

    console.log("Creating role:", roleName);

    let role = await prisma.role.findFirst({

      where:{
        name: roleName,
        companyId: null
      }

    });


    if(!role){

      role = await prisma.role.create({

        data:{
          name: roleName,
          isSystemRole:true
        }

      });

  }


  roles[roleName] = role;

}

console.log("Roles created:", roles);



  // STEP 3: Assign permissions to roles
  // THIS IS WHERE STEP 16 GOES

await prisma.userRole.upsert({

    where:{
      userId_roleId:{
        userId:user.id,
        roleId:roles.Owner.id
      }
    },

    update:{},

    create:{
      userId:user.id,
      roleId:roles.Owner.id
    }

});


  const rolePermissions = {

    Owner:[
      "company.manage",
      "user.create",
      "user.update",
      "job.create",
      "invoice.create"
    ],


    Technician:[
      "job.view",
      "job.update"
    ],


    Accounting:[
      "invoice.view"
    ]

  };

  console.log("Assigning role permissions...");

  for(const [roleName, permissions] of Object.entries(rolePermissions)){


    const role = roles[roleName];


    for(const permissionName of permissions){


      const permission = permissionRecords[permissionName];

      if(!permission){
        throw new Error(
           `Missing permission seed: ${permissionName}`
        );
      }


      await prisma.rolePermission.upsert({

        where:{
          roleId_permissionId:{
            roleId:role.id,
            permissionId:permission.id
          }
        },


        update:{},


        create:{
          roleId:role.id,
          permissionId:permission.id
        }

      });

    }

  }


  console.log("Seed complete");

}


main()
.catch(console.error)
.finally(async()=>{

 await prisma.$disconnect();

});