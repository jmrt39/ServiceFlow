import { prisma } from "../../lib/prisma.js";


export async function userHasPermission(
 userId:string,
 permissionName:string
){

const permission =
await prisma.userRole.findFirst({

where:{

 userId,

 role:{

  permissions:{

   some:{

    permission:{

     name:permissionName

    }

   }

  }

 }

}

});


return !!permission;

}