# StayFlow — Smart Valet & Autonomous Vehicle Handling

Status: product concept and guest-flow preview. No robot, vehicle, parking operator, or OEM system is connected.

## Product principle
StayFlow must not require a guest to own a self-driving vehicle. The hotel/parking facility chooses a safe handling method for each vehicle. The guest experience remains one simple request in StayFlow.

## Three handling modes
1. **Vehicle-native Automated Valet Parking (AVP):** for a vehicle and facility explicitly approved for SAE Level 4 AVP. The OEM / AVP provider moves the unoccupied vehicle under its approved operational design domain.
2. **External robotic vehicle handling:** an autonomous parking robot or AGV physically lifts/moves the stationary vehicle, typically by its wheels or using a carrier/pallet. The vehicle does not need its own autonomous-driving computer and does not need to be started. A real system such as Stanley Robotics' Stan demonstrates this category: it scans vehicle dimensions, lifts the vehicle by its wheels and transports it using fleet-management software.
3. **Human chauffeur fallback:** when a vehicle is not compatible with the available robot/platform, or the owner requests human handling, a vetted and insured hotel valet takes the vehicle under the hotel's documented key-control and insurance procedures. This is a manual fallback, not autonomous operation.

## Luxury and performance vehicle requirements
Do not claim universal compatibility. For Maybach, Mercedes-AMG, Bentley, Rolls-Royce, Ferrari, Lamborghini, Porsche and other premium / performance vehicles, eligibility must be checked per exact model and configuration.

Required checks include:
- vehicle mass and axle loads;
- wheelbase, track width, overall length and width;
- minimum ground clearance and underbody geometry;
- tyre dimensions, wheel design, wheel offset and permitted wheel contact zones;
- low front splitters, side skirts, air suspension position and aftermarket bodywork;
- EV battery / underbody protection and manufacturer restrictions;
- robot or platform rated capacity and geometry;
- safe access to the handover bay and parking route;
- insurance coverage, custody chain and documented pre/post-condition inspection.

Some long-wheelbase, heavy, low-clearance or modified vehicles will not fit a given robot's operating envelope. The product must show a verified handling option or offer human valet / alternative secure parking. Never force a vehicle into an unsuitable robot.

## Guest workflow
1. Guest chooses the hotel and parking service in StayFlow.
2. Guest provides vehicle make/model/year and registration, or selects an existing vehicle profile. Collect only what is needed.
3. The facility's compatibility service checks the exact vehicle against available handling methods and their limits.
4. StayFlow shows the available option: vehicle-native AVP, external robot/platform, or human valet. Clearly disclose which method will be used.
5. Guest books a handover slot and receives the marked entrance / instructions.
6. At handover, staff/system verifies identity and booking, records vehicle condition (photos with consent), mileage if relevant, fuel/charge state, keys custody if applicable, and guest authorization.
7. The selected operator performs the move. StayFlow displays status and parking receipt/location.
8. Guest requests return. The same authorized operator brings the car to the designated collection point.
9. Guest verifies the vehicle and completes the handover; condition record is closed.

## Luxury guest experience
- discreet, reserved handover area and scheduled arrival;
- no unnecessary key transfer for robot/platform methods;
- clear custody, insurance and liability terms;
- optional concierge coordination and luggage assistance;
- pre/post-condition report with timestamped photos and guest consent;
- special handling notes (low clearance, charging, child seats, luggage, privacy);
- priority retrieval reservation and transparent wait-time updates.

## System boundary and safety
StayFlow is the guest-facing booking, orchestration, status and communication layer. It does not steer, brake, accelerate, unlock, immobilize, or otherwise control a vehicle. Movement is performed only by an approved AVP provider, certified/qualified robotic parking operator, or authorized human valet under applicable law and insurance.

For autonomous robot/platform operation:
- vehicle must be stationary and unoccupied before lifting/movement;
- verify vehicle dimensions, weight and geometry against the exact robot model's certified limits;
- use approved lifting/contact points and protect wheels, tyres, bodywork and underbody;
- operate only within the robot/facility's approved operating domain;
- stop safely on obstacle, uncertainty, communication loss or fault;
- maintain a human emergency response and recovery process;
- never expose generic robot movement controls to guests or untrained hotel staff.

For human valet:
- require appropriately authorized/insured drivers and clear key custody;
- obtain explicit guest authorization and document vehicle condition;
- apply hotel/operator insurance and incident procedures.

## Known real-world reference
Stanley Robotics describes Stan as an autonomous robot that scans a vehicle's dimensions, lifts it by the wheels, transports it to a parking location and retrieves it on request. Its published robot specifications include a maximum lift capacity of up to 3 tonnes; actual compatibility still depends on the specific robot, vehicle geometry and facility. The 2026 Gatwick deployment describes its own initial vehicle limits (including maximum weight and wheelbase), demonstrating why compatibility must be facility-specific.

## Required integrations
- hotel booking / guest identity;
- parking operator availability, bays, handover and retrieval scheduling;
- robotic parking vendor fleet API, safety state and mission status (where applicable);
- OEM AVP eligibility and session API (where applicable);
- valet staff dispatch and secure key custody (manual fallback);
- condition inspection, insurance, incident management and audit log;
- privacy controls, retention limits and access permissions.

## Delivery plan
1. Guest-flow prototype and vehicle profile (current stage).
2. Technical and commercial evaluation with robot/platform vendors and luxury hotel parking operators.
3. Obtain exact vehicle compatibility matrices and insurance / safety documentation.
4. Pilot at one facility with a small, verified vehicle list and human fallback.
5. Add live status/API integrations only after vendor authorization and safety/legal review.
6. Expand to additional hotels and vehicle categories based on verified compatibility.
