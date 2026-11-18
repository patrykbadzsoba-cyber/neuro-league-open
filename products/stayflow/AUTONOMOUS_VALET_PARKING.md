# StayFlow Smart Valet — Sensor-Coordinated Autonomous Hotel Parking

**Status:** architecture concept and guest-interface prototype. This repository does not contain certified autonomous-driving software, a safety controller, hardware drivers, or live integrations. No real vehicle can be moved by the current demo.

## Product vision
A hotel guest arrives, stops in a designated handover zone, exits with their luggage and leaves. The system—not a human valet—identifies the vehicle, verifies that the handover zone is clear, selects a free bay, checks a safe route, coordinates autonomous movement and confirms secure parking. When the guest requests the car, the system retrieves it to a designated pick-up zone.

The service should not depend on the guest tipping a parking attendant or handing keys to a person. The aim is a consistent guest-facing service across hotel brands and countries.

## The key engineering distinction
A network of cameras and sensors can perceive the garage, track vehicles and plan/monitor routes. **Sensors alone cannot steer or propel an ordinary car.** Every deployment needs a physically valid movement method:
1. **Vehicle-native AVP:** an eligible vehicle with approved automated-driving hardware/software and a supported facility interface.
2. **Autonomous carrier / robotic parking vehicle:** a purpose-built machine moves a stationary, unoccupied guest car. This is the route to investigate for vehicles that do not have their own AVP capability. The carrier must support the vehicle's exact dimensions, weight, wheel/tyre geometry, ground clearance and underbody constraints.
3. **No autonomous service for that vehicle/site:** if neither method is approved and compatible, StayFlow must not imply that the vehicle can be moved autonomously. The product should show the limitation and an optional separately disclosed conventional parking alternative; the core autonomous service must never silently fall back to a human valet.

## Reference architecture

### A. Site perception layer
A modular sensor kit is installed in the garage and handover / collection areas:
- overhead and fixed cameras for vehicle/person/object detection and zone coverage;
- LiDAR at critical intersections, ramps, blind corners and handover areas for 3D obstacle detection and localization;
- radar or other independent sensing where required by the safety case;
- bay occupancy sensors (ultrasonic, magnetometer or camera-based) to determine free/occupied spaces;
- door, gate, lift, fire-system and access-control status inputs;
- optional environmental sensors for lighting, smoke/fire and water ingress as required by the facility design.

The exact mix is selected after a site survey and safety engineering. Existing CCTV or parking sensors may be reusable for non-safety functions, but must not automatically be treated as safety-rated perception.

### B. Edge processing and facility digital map
An on-site edge computer receives sensor data, time-synchronizes and fuses observations, tracks vehicles and pedestrians, maintains a digital map, identifies free bays and computes candidate paths. It must continue to enter a safe state if cloud or internet connectivity is lost. The cloud is not the real-time safety controller.

### C. Independent safety layer
A separately engineered safety controller / safety PLC supervises permitted operating zones, obstacle-clearance status, speed limits, emergency stops, door/gate interlocks, communication health and system faults. It can inhibit or stop a movement mission. The exact safety architecture and integrity levels require specialist hazard analysis and certification; a web application or AI model must never be the sole safety authority.

### D. Vehicle movement layer
The site controller dispatches a mission to one of:
- an OEM-authorized vehicle AVP interface; or
- an autonomous carrier robot / automated parking machinery.

StayFlow does not issue steering, throttle, brake, gear, unlock or immobilizer commands. It sends an authenticated service request to the approved parking operator/controller. Only that controller can decide whether a vehicle and route are eligible and execute a movement mission.

### E. StayFlow guest and hotel layer
StayFlow handles hotel identity, guest authorization, booking association, vehicle profile, service availability, arrival window, handover instructions, retrieval request, progress notifications, receipt and support. Hotel staff see operational exceptions and service status, not unrestricted robot/vehicle controls.

## End-to-end guest workflow
1. Guest books parking or receives the service invitation with the hotel booking.
2. Guest registers make/model/year and registration; VIN may be requested only when required by the operator for eligibility. Data minimization applies.
3. Site service checks the vehicle against approved movement methods and exact operating limits.
4. Guest arrives at a marked handover zone and exits the vehicle with all passengers.
5. System verifies the handover zone is empty, vehicle identity and authorization are valid, all access gates are in the required state, and the selected movement method is ready.
6. Facility perception confirms the route is clear and a suitable bay is free. The safety layer authorizes or rejects the mission.
7. Vehicle-native AVP or the autonomous carrier moves the vehicle within the approved operating domain. StayFlow displays status only.
8. Parking location and mission completion are confirmed and recorded.
9. Guest requests retrieval in StayFlow. The controller rechecks the vehicle, route, gates, people and collection zone before dispatch.
10. Vehicle is returned to the collection zone; the guest is notified and completes collection.

## Universal product, not universal hardware
The commercial objective is one StayFlow software product that can integrate multiple approved parking infrastructures through standard adapters. It is **not technically honest to claim that one sensor kit can be installed in every hotel and immediately move every car**. Garages differ in geometry, lighting, ramps, pillars, traffic flow, fire compartments, connectivity, legal status and evacuation routes. A standardized retrofit package can reduce custom engineering, but every site still needs a survey, mapping, installation, calibration, commissioning, safety validation and operating approval.

### Standard deployment packages
- **Package S — Sensor retrofit:** bay occupancy and parking guidance only; no autonomous vehicle movement. Useful as an entry product for hotels not yet ready for AVP.
- **Package M — Mapped smart garage:** camera/LiDAR perception, edge controller, digital map, access interlocks and fleet interface. Enables autonomous missions only when paired with an approved AVP vehicle or carrier system.
- **Package L — Full autonomous valet:** Package M plus certified vehicle AVP support or autonomous carrier fleet, dedicated handover/collection zones, redundant safety systems, emergency response and operator certification.

## Premium vehicle requirements
Support for Maybach, Bentley, Rolls-Royce, Ferrari, Lamborghini, Porsche and other premium/performance vehicles must be verified by exact model and configuration. The eligibility profile includes:
- overall length/width/height, wheelbase, track width and mass/axle loads;
- minimum ground clearance, front/rear overhang, splitters, side skirts and air-suspension state;
- tyre dimensions, wheel geometry, permitted wheel contact and carrier pickup method;
- underbody and battery protection, exhaust geometry and manufacturer restrictions;
- modifications, luggage, roof boxes and other protrusions;
- exact carrier rated capacity and dimensional envelope.

A low-clearance or modified vehicle must not be forced onto an incompatible carrier. The system must reject it or offer a clearly identified alternative; it must not silently hand it to a human.

## Safety principles
- No movement while any person or animal is in the vehicle or within a prohibited zone.
- Positive vehicle identity, booking association and guest authorization before each mission.
- Continuous perception and independent safety monitoring throughout movement.
- Defined operational design domain: mapped facility, speed, lighting, weather (if outdoor), ramp and surface conditions.
- Safe stop on obstacle, uncertain detection, sensor disagreement, loss of communications or controller fault.
- Emergency-stop devices and trained site response; rescue/recovery procedures for disabled carrier or vehicle.
- Access control, signed commands, secure communications, role-based access, audit logs and cybersecurity assessment.
- No remote human driving presented as autonomous valet.
- Insurance, custody, liability, fire safety, accessibility and local regulatory approval before operation.

## Interoperability and integrations
Create adapter interfaces rather than hard-code one supplier:
- parking guidance / bay occupancy systems;
- camera, LiDAR and radar perception vendors;
- edge controller and safety PLC;
- autonomous carrier / automated parking machinery fleet API;
- OEM AVP / vehicle-facility interface where supported;
- hotel PMS, booking, payment and access control;
- guest notifications and customer support.

Each adapter must declare its capabilities, safety certification evidence, operational domain, telemetry, error states and supported commands. StayFlow accepts high-level service intents (park vehicle / retrieve vehicle), not low-level motion commands.

## Implementation plan
1. **Current repo prototype:** guest handover/retrieval concept and illustrative infrastructure status. UI only.
2. Define vendor-neutral data model and adapter contract for site, sensor zones, parking bays, vehicle profiles, missions, telemetry and fault states.
3. Conduct a technical feasibility study with AVP OEMs, autonomous carrier vendors, parking operators, insurers and hotel groups.
4. Select one pilot garage with documented geometry and a limited, validated vehicle envelope.
5. Install and commission site sensors, edge processing and independent safety controls; validate in a closed test environment.
6. Connect StayFlow to the operator's authorized high-level API and run end-to-end trials without guest vehicles.
7. Complete functional safety, cybersecurity, data protection, insurance and regulatory approval.
8. Launch a constrained pilot, publish exact vehicle/site eligibility, measure reliability and incidents, then standardize retrofit kits for other sites.

## Evidence and references
- SAAM Automated Valet Parking project: central system, vehicle/facility interoperability and a 22-camera parking garage demonstrator. https://www.saam.swiss/projects/automated-valet-parking-avp/
- Bosch / APCOA: planned rollout of infrastructure technology to 15 additional German garages, initially installing infrastructure in four spaces per garage. This is evidence of phased, zone-based deployment—not instant compatibility with every garage. https://www.bosch-presse.de/pressportal/de/en/bosch-and-apcoa-to-provide-automated-valet-parking-technology-in-parking-garages-across-germany-250496.html
- IEEE overview: automated parking combines sensing, obstacle detection, route planning and a safety case; mechanical parking and vehicle-native AVP are distinct approaches. https://technav.ieee.org/topic/automated-parking/
- Peer-reviewed AVP system architecture study: vehicle-side perception/localization/planning/control and infrastructure-based sensing are distinct subsystems; drive-by-wire and approved vehicle actuation are needed for vehicle-native autonomous movement. https://link.springer.com/article/10.1007/s12239-024-00031-9
- Retrofit parking occupancy guidance systems can use per-bay sensors or camera heads, but occupancy detection by itself is not autonomous vehicle control. https://kyosis.com/solutions/automated-parking-guidance-system/


## Coordinated luggage-to-room service

The arrival experience is a coordinated set of independent services:
- **Vehicle movement:** the parking system moves the car to its assigned space using an approved vehicle AVP interface or autonomous carrier.
- **Luggage collection:** a separate baggage-handling unit is assigned to the guest's arrival. The long-term automation target is robotic trunk access and unloading using a purpose-built manipulator, followed by secure transfer to an autonomous indoor delivery robot.
- **Room delivery:** an indoor mobile robot transports tagged luggage through mapped corridors and approved lifts to the guest's room. The hotel access-control and lift systems provide authorized route access.
- **Room readiness:** StayFlow checks room status and, where supported and authorized, coordinates climate, lighting and guest preferences.
- **Welcome:** the guest can choose a bar reservation, welcome drink or in-room service without waiting for the luggage workflow.

### Important technical boundary
Indoor luggage delivery robots are commercially available, but fully autonomous extraction of arbitrary luggage from arbitrary vehicle trunks is a substantially harder robotics problem and must not be represented as an off-the-shelf capability. Trunk geometry, powered tailgate controls, vehicle security, luggage shape/weight, fragile objects and guest privacy all vary. A real autonomous unloading system needs a validated robotic manipulator, vehicle-specific access procedure, object detection/grasp planning, force limits, human-safe operation, custody verification and a fallback for unsupported vehicles. Until a validated robotic unloading solution is integrated, the hotel must clearly identify any human-assisted unloading as a separate optional service; it must not pretend that a robot performed the work.

### Luggage chain of custody
1. Associate the luggage request with the verified guest booking and vehicle arrival.
2. Confirm the vehicle is stationary, secured and in the designated handover bay.
3. Record bag count and optional visual condition record with guest consent.
4. Assign a unique bag identifier (QR/RFID/NFC tag) and link it to the guest and destination room.
5. Transfer bags to the indoor delivery robot using an approved loading interface.
6. Confirm each bag is loaded and secured before movement.
7. Navigate only through mapped, accessible, guest-safe routes; coordinate automatic doors and lifts through authorized interfaces.
8. Deliver to the room or an explicitly selected secure handover point. Verify recipient authorization before release.
9. Record delivery confirmation and close custody record.

### Robot and building integrations
- baggage manipulator / trunk access system;
- indoor autonomous mobile robot (AMR) fleet manager;
- elevators, access-controlled doors and destination-floor permissions;
- luggage identification and chain-of-custody service;
- hotel PMS / room assignment / room-ready state;
- guest notifications and concierge escalation;
- fire alarm and emergency routing interlocks.

### Guest promise
The guest should be able to leave the vehicle, proceed directly to the bar or room, and receive their luggage without having to manage separate hotel departments. StayFlow coordinates the experience; each physical robot and building subsystem remains responsible for its certified safe operation.


## Corrected operating model: hotel staff + transport robots

The intended baggage process is **human-robot collaboration**, not a fully robotic trunk-unloading system.

1. A hotel employee meets the guest at the arrival / vehicle handover area after the passengers have exited.
2. The employee opens the luggage compartment with the guest's authorization, unloads the suitcases, checks the bag count and visible condition, and attaches a booking-linked identifier.
3. The employee places the luggage onto an indoor autonomous mobile robot (AMR) or powered luggage cart. The robot is responsible for transport, not trunk manipulation.
4. The robot follows a mapped, accessible route and requests an authorized lift journey through the building-management / elevator interface.
5. At the destination floor, a second hotel employee receives the luggage, verifies the room assignment and takes the bags to the guest's room.
6. StayFlow records the handoffs and sends the guest a delivery confirmation.

### Role allocation
- **Arrival employee:** guest greeting, unloading, bag count, tagging, condition/custody check and loading the robot.
- **Transport robot:** carrying bags through corridors and lifts; obstacle detection, safe stopping and delivery to the designated staff handoff point.
- **Floor employee:** receiving bags, verifying room number and completing the last metres to the guest's door.
- **StayFlow:** links the booking, room, bag identifiers, robot mission, lift request, staff handoffs, timestamps and guest notifications.

### Why this is the intended first deployment
It uses commercially established indoor mobile-robot capabilities while retaining people for the variable and delicate tasks: opening different vehicle trunks, handling different luggage shapes, checking fragile items and final room delivery. It avoids pretending that an autonomous manipulator can safely unload every car. The workflow is designed to reduce carrying and walking while keeping accountable staff handoffs.

The hotel may later automate additional steps where a specific validated system makes sense, but robotic trunk unloading is not a dependency for the core product.


## Site layout principle: garage-level logistics and hidden back-of-house circulation

**The guest-facing hotel must remain free of baggage handling and service traffic.** Most physical operations happen at garage / service level, outside the public arrival, lobby, bar, restaurant and guest elevator areas.

### Garage / service level
- Dedicated vehicle handover bays, physically separated from pedestrian paths.
- The autonomous parking system takes custody of the vehicle only after guest exit and safety checks.
- A trained garage support crew handles luggage: unloads the trunk with guest authorization, checks count and visible condition, applies booking-linked tags and loads the transport robot.
- A secure staging / dispatch area buffers luggage and robot missions so staff do not crowd the vehicle handover lane.
- The garage crew also handles exceptional items and luggage that cannot safely be placed on a robot.

### Back-of-house transport
- Robots travel through mapped service corridors and dedicated service lifts.
- They do not use public lobby routes or guest elevators during normal operation.
- Service lifts, doors and access-control points are coordinated with the robot fleet manager and building management system.
- Route planning separates robot traffic from guests, housekeeping carts, deliveries, fire exits and emergency access.
- A robot waits at a designated service handoff point; it does not autonomously enter guest rooms.

### Floor-side delivery
- A small floor support team receives luggage at a discreet service point.
- Staff verify room assignment and bag identifiers, then deliver luggage to the room.
- StayFlow sends the guest a confirmation; the guest can go directly to the bar, restaurant or room without waiting in the lobby.

### Operating layout and staffing
- Garage support crew: vehicle-side luggage collection, tagging, loading, exception handling.
- Robot fleet: repetitive internal transport between garage/service level and floor-side handoff points.
- Floor support: final delivery, guest-specific requests and exception resolution.
- Central StayFlow orchestration: task assignment, lift scheduling, robot dispatch, custody events and notifications.

### Building design requirements
A hotel retrofit needs a site survey to identify whether service lifts, corridors, fire compartments, door widths, floor transitions, turning radii, charging points and staging areas can support robots. New-build hotels should plan a dedicated service circulation spine and service lift access from the garage to each accommodation level. Fire doors, evacuation routes and emergency responder access must never be obstructed. If a site lacks suitable service circulation, it must not send robots through guest spaces by default; it needs a site-specific redesign or a clearly scoped manual exception process.

### Guest experience rule
The guest should see the service outcome, not the logistics: car safely parked, luggage delivered, room ready, optional welcome service waiting. No queue for a porter, no luggage carts crossing the lobby, and no need to coordinate separate hotel departments.
