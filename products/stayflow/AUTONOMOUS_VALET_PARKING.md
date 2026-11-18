# StayFlow — Autonomous Valet Parking (AVP)

Status: product concept and UI preview only. No vehicle-control capability is implemented.

## Guest experience
1. Guest opens StayFlow and selects a participating hotel/parking facility.
2. Guest enters or selects the vehicle identity and booking reference.
3. StayFlow checks availability through the parking operator / OEM integration. It must not infer that a car is AVP-capable merely because it has onboard computers or parking sensors.
4. Guest drives to the designated handover zone, parks, exits the vehicle, confirms all occupants have exited, and authorizes the handover.
5. The certified AVP system validates vehicle eligibility, facility readiness, route safety and authorization. Only then does it accept the vehicle.
6. The AVP system moves the unoccupied vehicle to an assigned parking space and returns a confirmed status.
7. Guest requests retrieval in StayFlow. The AVP operator returns the vehicle to the approved pick-up zone and notifies the guest.
8. Guest verifies the vehicle and completes handover.

## System boundary
StayFlow is the guest-facing orchestration and communication layer. It does not control steering, throttle, braking, vehicle locks, immobilizers or autonomous-driving functions. Actual movement must be performed only by an OEM-approved / certified AVP stack and an authorized parking operator.

## Required integrations
- Hotel / parking operator: facility participation, bay availability, handover and pick-up zones, booking and payment.
- Vehicle OEM / AVP provider: VIN or vehicle eligibility, capability status, authorization, AVP session creation, status updates, retrieval and fault states.
- Identity and security: authenticated guest, booking-to-vehicle binding, explicit consent, step-up verification for handover/retrieval, audit trail.
- Operations: staff override and assistance, incident reporting, emergency stop channel, lost connectivity and failed-maneuver handling.
- Privacy: data minimization, retention limits, clear disclosure of location/vehicle data and access controls.

## Mandatory safety gates
- Never start movement unless the vehicle is confirmed unoccupied and the authorized user has explicitly confirmed handover.
- Operate only within the AVP provider's approved operational design domain and participating facility.
- Require positive confirmation from vehicle and infrastructure before accepting a command.
- On obstacle, uncertainty, communication loss or system fault, the AVP system must execute its certified safe-stop / fallback behavior.
- Do not expose a generic “drive my car” API to StayFlow or hotel staff.
- Do not claim broad compatibility: many vehicles with onboard computers, cameras or parking assist do not support unattended SAE Level 4 AVP.

## Standards and evidence
- ISO 23374-1:2023 defines AVP as SAE Level 4 automated driving of unoccupied vehicles within a prescribed parking facility, with distributed vehicle, facility and user subsystems.
- Bosch and Mercedes-Benz have an approved AVP deployment for eligible S-Class and EQS variants in a specifically equipped APCOA facility at Stuttgart Airport. It relies on vehicle technology plus intelligent parking-facility infrastructure.
- AVP is therefore a real but constrained capability, not a generic feature of most modern cars.

## Delivery plan
1. Prototype the guest flow and status display (current UI preview).
2. Identify AVP-capable OEMs and participating parking operators; obtain technical and commercial API documentation.
3. Pilot with one hotel physically connected to an approved AVP parking facility.
4. Complete legal, insurance, privacy, cybersecurity and operational safety review before any live handover or movement.
5. Expand facility-by-facility; do not advertise unsupported vehicles or locations.
