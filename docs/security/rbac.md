# ServiceFlow RBAC

## Structure

User
 |
UserRole
 |
Role
 |
RolePermission
 |
Permission


## System Roles

Owner
Admin
Dispatcher
Technician
Accounting


## Multi Tenant Support

System roles:
companyId = null


Custom company roles:
companyId = customer company id


Companies may create custom roles without affecting other tenants.