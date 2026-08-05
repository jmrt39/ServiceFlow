                                           ┌──────────────────────┐
                                           │       Company        │
                                           ├──────────────────────┤
                                           │ PK id               │
                                           │ name                │
                                           │ businessType        │
                                           │ email               │
                                           │ phone               │
                                           │ website             │
                                           │ timezone            │
                                           │ subscriptionPlan    │
                                           │ status              │
                                           │ stripeCustomerId    │
                                           │ quickbooksRealmId   │
                                           │ createdAt           │
                                           │ updatedAt           │
                                           └──────────┬───────────┘
                                                      │
             ┌────────────────────────────────────────┼────────────────────────────────────────┐
             │                                        │                                        │
             ▼                                        ▼                                        ▼

      ┌───────────────┐                      ┌────────────────┐                     ┌──────────────────┐
      │ CompanySetting│                      │     User       │                     │ CustomField      │
      ├───────────────┤                      ├────────────────┤                     ├──────────────────┤
      │ PK id         │                      │ PK id          │                     │ PK id            │
      │ FK companyId  │                      │ FK companyId   │                     │ FK companyId     │
      │ key           │                      │ email          │                     │ entityType       │
      │ value         │                      │ passwordHash   │                     │ label            │
      └───────────────┘                      │ firstName      │                     │ fieldType        │
                                             │ lastName       │                     │ required         │
                                             │ phone          │                     │ defaultValue     │
                                             │ active         │                     │ validationRules  │
                                             └──────┬─────────┘                     └─────────┬────────┘
                                                    │                                         │
                                                    ▼                                         ▼

                                           ┌────────────────┐                     ┌────────────────────┐
                                           │    UserRole    │                     │ CustomFieldValue   │
                                           ├────────────────┤                     ├────────────────────┤
                                           │ FK userId      │                     │ PK id              │
                                           │ FK roleId      │                     │ FK customFieldId   │
                                           └────────────────┘                     │ entityId           │
                                                                                  │ value              │
                                                                                  └────────────────────┘

                                                    │
                                                    ▼

                                             ┌──────────────┐
                                             │     Role     │
                                             ├──────────────┤
                                             │ PK id        │
                                             │ name         │
                                             │ description  │
                                             └──────┬───────┘
                                                    │
                                                    ▼

                                           ┌────────────────────┐
                                           │ RolePermission     │
                                           ├────────────────────┤
                                           │ FK roleId          │
                                           │ FK permissionId    │
                                           └─────────┬──────────┘
                                                     │
                                                     ▼

                                             ┌────────────────┐
                                             │ Permission     │
                                             ├────────────────┤
                                             │ PK id          │
                                             │ resource       │
                                             │ action         │
                                             └────────────────┘



═══════════════════════════════════════════════════════════════════════
CUSTOMER MANAGEMENT
═══════════════════════════════════════════════════════════════════════

Company

   │

   ▼

Customer

├── PK id
├── FK companyId
├── customerNumber
├── type (Residential/Commercial)
├── name
├── email
├── phone
├── notes
├── createdAt

      │
      ├──────────────┐
      ▼              ▼

CustomerAddress     CustomerContact

      │              │

      └──────┬───────┘
             ▼

           Job



═══════════════════════════════════════════════════════════════════════
SERVICE MANAGEMENT
═══════════════════════════════════════════════════════════════════════

ServiceCategory

↓

Service

↓

JobService

↓

Job



═══════════════════════════════════════════════════════════════════════
JOB MANAGEMENT
═══════════════════════════════════════════════════════════════════════

Job

├── PK id
├── FK companyId
├── FK customerId
├── status
├── priority
├── source
├── description
├── scheduledDate
├── completedDate

      │
      ├────────────┐
      ▼            ▼

Appointment      Estimate

      │            │
      ▼            ▼

TechnicianAssignment

      │

      ▼

Invoice

      │

      ▼

Payment



═══════════════════════════════════════════════════════════════════════
INVENTORY
═══════════════════════════════════════════════════════════════════════

Company

│

▼

Product

│

▼

Inventory

│

▼

PurchaseOrder



═══════════════════════════════════════════════════════════════════════
COMMUNICATION
═══════════════════════════════════════════════════════════════════════

Notification

SMSMessage

EmailMessage

PushNotification

Conversation

ConversationMessage



═══════════════════════════════════════════════════════════════════════
FILES
═══════════════════════════════════════════════════════════════════════

Attachment

├── PK id
├── entityType
├── entityId
├── fileName
├── storageUrl
├── uploadedBy



═══════════════════════════════════════════════════════════════════════
AUDIT
═══════════════════════════════════════════════════════════════════════

ActivityLog

AuditLog

ApiRequestLog

WebhookEvent

IntegrationLog



═══════════════════════════════════════════════════════════════════════
INTEGRATIONS
═══════════════════════════════════════════════════════════════════════

Integration

├── Stripe
├── QuickBooks
├── Google Calendar
├── Outlook
├── Twilio
├── Mailgun
├── SendGrid
├── Zapier
├── OpenAI
├── Google Maps
├── GPS Tracking



═══════════════════════════════════════════════════════════════════════
FUTURE AI
═══════════════════════════════════════════════════════════════════════

AIConversation

AITask

AISuggestion

AIJobEstimate

AIJobSummary

AIAppointmentOptimization



═══════════════════════════════════════════════════════════════════════
FUTURE MOBILE
═══════════════════════════════════════════════════════════════════════

TechnicianLocation

Device

PushToken

OfflineSyncQueue

PhotoUploadQueue