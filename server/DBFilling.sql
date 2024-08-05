-- CREATE 3 USERS IN UI FIRST!!!!!!!!!!!!!!!!!!!!!!!

-- Car models table:

INSERT INTO car_model(model_code, model, year, engine_power_kw, battery_kwh, range_mi, top_speed_mi, driveline, zero_sixty, towing_capacity, features, price, availability, motor, torque) 
VALUES("polestar2-dual-long-perfomance", "Polestar 2", "2024", 350, 82, 352, 127, "All-wheel drive", 4.0, 1500, "Electric power steering with three modes: light, standard and firm;Swedish gold Brembo four-piston fixed aluminium front calipers with drilled ventilated discs (with Performance pack;Ohlins Dual Flow Valve (DFV) Manually adjustable dampers (22 Settings) front and rear (with Performance pack);Turning circle 11,5 m", 57950, 45, "Dual Motor Perfomance", 740);
INSERT INTO car_model(model_code, model, year, engine_power_kw, battery_kwh, range_mi, top_speed_mi, driveline, zero_sixty, towing_capacity, features, price, availability, motor, torque) 
VALUES("polestar2-dual-long", "Polestar 2", "2024", 310, 82, 368, 127, "All-wheel drive", 4.3, 1500, "Electric power steering with three modes: light, standard and firm;Manually adjustable steering column;2-piston aluminium brakes, 345x30 mm (front) and 340x20 mm (rear) ventilated discs;Swedish gold Brembo four-piston fixed aluminium front calipers with drilled ventilated discs (with Performance pack;Twin tube, single-flow valve shock absorbers Suspension;Turning circle 11,5 m", 52950, 170, "Dual Motor", 740);
INSERT INTO car_model(model_code, model, year, engine_power_kw, battery_kwh, range_mi, top_speed_mi, driveline, zero_sixty, towing_capacity, features, price, availability, motor, torque) 
VALUES("polestar2-single-long", "Polestar 2", "2024", 220, 82, 406, 127, "Rear-wheel drive", 5.9, 1500, "Electric power steering with three modes: light, standard and firm;Manually adjustable steering column;2-piston aluminium brakes, 345x30 mm (front) and 340x20 mm (rear) ventilated discs;Swedish gold Brembo four-piston fixed aluminium front calipers with drilled ventilated discs (with Performance pack;Twin tube, single-flow valve shock absorbers Suspension;Turning circle 11,5 m", 48950, 154, "Single Motor", 490);
INSERT INTO car_model(model_code, model, year, engine_power_kw, battery_kwh, range_mi, top_speed_mi, driveline, zero_sixty, towing_capacity, features, price, availability, motor, torque) 
VALUES("polestar2-single-standard", "Polestar 2", "2024", 200, 69, 339, 127, "Rear-wheel drive", 6.2, 1500, "Electric power steering with three modes: light, standard and firm;Manually adjustable steering column;2-piston aluminium brakes, 345x30 mm (front) and 340x20 mm (rear) ventilated discs;Swedish gold Brembo four-piston fixed aluminium front calipers with drilled ventilated discs (with Performance pack;Dual Flow Valve (DFV) Manually adjustable dampers (22 Settings) front and rear (with Performance pack) Suspension;Turning circle 11,5 m", 44950, 179, "Single Motor", 490);

INSERT INTO car_model(model_code, model, year, engine_power_kw, battery_kwh, range_mi, top_speed_mi, driveline, zero_sixty, towing_capacity, features, price, availability, motor, torque) 
VALUES("polestar3-single-long", "Polestar 3", "2024", 220, 111, 403, 112, "Rear-wheel drive", 7.5, 1500, "Power-operated steering column;Rear-wheel drive with all single motor variants;Standard anodised brake callipers, with ventilated 390-mm discs (Swedish gold callipers with Performance pack);Passive chassis for Long range Single motor variant;Double wishbone front suspension;Integral link rear suspension;Turning circle 11.8 m (kerb to kerb)", 69900, 23, "Single Motor", 490);
INSERT INTO car_model(model_code, model, year, engine_power_kw, battery_kwh, range_mi, top_speed_mi, driveline, zero_sixty, towing_capacity, features, price, availability, motor, torque) 
VALUES("polestar3-dual-long", "Polestar 3", "2024", 360, 111, 392, 130, "All-wheel drive", 4.8, 2200, "Electric power steering with three modes: standard, firm and light;All-wheel drive with all single motor variants;Aluminium 4-piston anodised brake callipers, with ventilated 400-mm discs (Swedish gold callipers with Performance pack);Dynamic chassis for Long range Dual motor variants;Double wishbone front suspension;Integral link rear suspension;Dual chamber active air suspension with standard, nimble, and firm settings, loading mode, and automatic ride height adjustment to optimise aerodynamics (Long range Dual motor);Turning circle 11.8 m (kerb to kerb)", 75900, 40, "Dual Motor", 840);
INSERT INTO car_model(model_code, model, year, engine_power_kw, battery_kwh, range_mi, top_speed_mi, driveline, zero_sixty, towing_capacity, features, price, availability, motor, torque) 
VALUES("polestar3-dual-long-perfomance", "Polestar 3", "2024", 380, 111, 348, 130, "All-wheel drive", 4.5, 2200, "Electric power steering with three modes: standard, firm and light;All-wheel drive with all single motor variants;Brake-by-wire system with Brembo performance brakes;Polestar Engineered chassis tuning (with Performance pack);Double wishbone front suspension;Integral link rear suspension;Dual chamber active air suspension with standard, nimble, and firm settings, loading mode, and automatic ride height adjustment to optimise aerodynamics (Long range Dual motor);Turning circle 11.8 m (kerb to kerb)", 81500, 11, "Dual Motor Perfomance", 910);

INSERT INTO car_model(model_code, model, year, engine_power_kw, battery_kwh, range_mi, top_speed_mi, driveline, zero_sixty, towing_capacity, features, price, availability, motor, torque) 
VALUES("polestar4-single-long", "Polestar 4", "2024", 200, 100, 385, 124, "Rear-wheel drive", 6.9, 1500, "Manually adjustable steering column;Brakes: 364 x 30 mm (front) and 350 x 26 mm (rear) ventilated discs with 2 x 43 mm-piston aluminium callipers;Standard dynamic chassis;Suspension: High-capacity passive dampers with internal rebound coil springs, combined with external coil springs;Turning circle (kerb to kerb) 11.64 m", 59990, 34, "Single Motor", 253);
INSERT INTO car_model(model_code, model, year, engine_power_kw, battery_kwh, range_mi, top_speed_mi, driveline, zero_sixty, towing_capacity, features, price, availability, motor, torque) 
VALUES("polestar4-dual-long", "Polestar 4", "2024", 200, 100, 367, 124, "All-wheel drive", 3.7, 2000, "Electric power steering with three modes: light, standard, and firm;Brakes: 364 x 30 mm (front) and 350 x 26 mm (rear) ventilated discs with 2 x 45 mm-piston aluminium callipers;Polestar Engineered chassis tuning;Suspension: Continuously controlled active ZF dampers with coil spring suspension (CCD) equipped with internal valve and rebound coil springs and external coil springs;Turning circle (kerb to kerb) 11.64 m", 66990, 10, "Dual Motor", 506);

-- Car table:

-- Polestar 2 Snow

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-single-standard", "Snow", "Embossed Textile", "R19 Aero", FALSE, "1HGCM82633A004352", "HJ24KOO", 3, 0, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-single-long", "Snow", "Embossed Textile", "R20 Pro", TRUE, "1HGCM82633A004353", "HJ24KOW", 2, 2000, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-single-long", "Snow", "Slate WeaveTech", "R20 Pro", TRUE, "1HGCM82633A004354", "HJ24KOS", 2, 2500, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-dual-long", "Snow", "Charcoal WeaveTech", "R20 Perfomance", TRUE, "1HGCM82633A004355", "HJ24KOQ", 2, 2500, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-dual-long-perfomance", "Snow", "Slate WeaveTech", "R20 Perfomance", TRUE, "1HGCM82633A004356", "HJ24KOT", 1, 3800, TRUE);

-- Polestar 2 Space

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-single-standard", "Space", "Embossed Textile", "R19 Aero", TRUE, "1HGCM82633A004357", "HJ24KOY", 3, 700, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-single-standard", "Space", "Charcoal WeaveTech", "R20 Pro", TRUE, "1HGCM82633A004358", "HJ24KOU", 3, 1200, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-dual-long", "Space", "Charcoal WeaveTech", "R20 Pro", TRUE, "1HGCM82633A004359", "HJ24KOI", 2, 2800, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-dual-long-perfomance", "Space", "Charcoal WeaveTech", "R20 Pro", FALSE, "1HGCM82633A004312", "HJ24KOP", 1, 3500, TRUE);

-- Polestar 2 Midnight

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-single-standard", "Midnight", "Embossed Textile", "R19 Aero", FALSE, "1HGCM82633A004322", "HJ24KOA", 3, 200, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-single-long", "Midnight", "Embossed Textile", "R20 Pro", TRUE, "1HGCM82633A004332", "HJ24KOS", 2, 600, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-dual-long", "Midnight", "Charcoal WeaveTech", "R20 Pro", TRUE, "1HGCM82633A004342", "HJ24KOD", 2, 1800, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-dual-long", "Midnight", "Slate WeaveTech", "R20 Pro", FALSE, "1HGCM82633A004362", "HJ24KOF", 2, 1900, TRUE);

-- Polestar 2 Thunder

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-single-long", "Thunder", "Embossed Textile", "R19 Aero", FALSE, "1HGCM82633A004372", "HJ24KOG", 2, 300, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-dual-long", "Thunder", "Charcoal WeaveTech", "R20 Pro", TRUE, "1HGCM82633A004382", "HJ24KOH", 2, 1200, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-dual-long", "Thunder", "Slate WeaveTech", "R20 Pro", TRUE, "1HGCM82633A004392", "HJ24KOJ", 2, 1300, TRUE);

-- Polestar 2 Jupiter

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-single-long", "Jupiter", "Embossed Textile", "R19 Aero", TRUE, "1HGCM82633A104352", "HJ24KOL", 2, 500, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-dual-long", "Jupiter", "Slate WeaveTech", "R20 Pro", TRUE, "1HGCM82633A204352", "HJ24KON", 2, 1200, TRUE);

-- Polestar 2 Magnesium

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-dual-long", "Magnesium", "Charcoal WeaveTech", "R20 Pro", TRUE, "1HGCM82633A304352", "HJ24KOM", 2, 1200, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar2-dual-long", "Magnesium", "Slate WeaveTech", "R20 Pro", TRUE, "1HGCM82633A404352", "HJ24KOB", 2, 1300, TRUE);

-- Polestar 3 Snow

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Snow", "Charcoal Nappa", "R22 Perfomance", FALSE, "1HGCM82633A224511", "HJ24QOO", 3, 300, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Snow", "Jupiter Nappa", "R22 Perfomance", FALSE, "1HGCM82633A224512", "HJ24WOW", 3, 300, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Snow", "Zinc Nappa", "R22 Perfomance", TRUE, "1HGCM82633A224513", "HJ24EOS", 3, 400, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-dual-long", "Snow", "Zinc Nappa", "R22 Perfomance", TRUE, "1HGCM82633A224514", "HJ24ROQ", 2, 2500, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-dual-long-perfomance", "Snow", "Wool", "R22 Perfomance", FALSE, "1HGCM82633A224515", "HJ24TOT", 1, 3000, TRUE);

-- Polestar 3 Space

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Space", "Jupiter Nappa", "R21 Plus", FALSE, "1HGCM82633A224516", "HJ24YOY", 3, 200, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Space", "Wool", "R22 Sport", TRUE, "1HGCM82633A224517", "HJ24UOU", 3, 700, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-dual-long", "Space", "MicroTech", "R22 Sport", TRUE, "1HGCM82633A224518", "HJ24IOI", 2, 800, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-dual-long-perfomance", "Space", "Zinc Nappa", "R22 Perfomance", FALSE, "1HGCM82633A224519", "HJ24OOP", 1, 1400, TRUE);

-- Polestar 3 Midnight

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Midnight", "Charcoal Nappa", "R21 Plus", FALSE, "1HGCM82633A224520", "HJ24AOA", 3, 300, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Midnight", "MicroTech", "R21 Plus", TRUE, "1HGCM82633A224521", "HJ24SOS", 3, 700, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-dual-long", "Midnight", "Zinc Nappa", "R22 Sport", TRUE, "1HGCM82633A224522", "HJ24DOD", 2, 1600, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-dual-long", "Midnight", "Jupiter Nappa", "R22 Perfomance", FALSE, "1HGCM82633A224523", "HJ24FOF", 2, 2000, TRUE);

-- Polestar 3 Thunder

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Thunder", "Jupiter Nappa", "R21 Plus", FALSE, "1HGCM82633A224524", "HJ24GOG", 3, 200, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-dual-long", "Thunder", "Wool", "R22 Sport", TRUE, "1HGCM82633A224525", "HJ24HOH", 2, 750, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-dual-long", "Thunder", "Zinc Nappa", "R22 Perfomance", TRUE, "1HGCM82633A224526", "HJ24JOJ", 2, 1900, TRUE);

-- Polestar 3 Magnesium

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-dual-long", "Magnesium", "Charcoal Nappa", "R21 Plus", FALSE, "1HGCM82633A224527", "HJ24LOM", 2, 550, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-dual-long", "Magnesium", "Jupiter Nappa", "R21 Plus", TRUE, "1HGCM82633A224528", "HJ24ZOB", 2, 650, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-dual-long", "Magnesium", "Jupiter Nappa", "R22 Perfomance", TRUE, "1HGCM82633A224529", "HJ24XOB", 2, 2100, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-dual-long", "Magnesium", "Wool", "R22 Perfomance", TRUE, "1HGCM82633A224530", "HJ24COB", 2, 2200, TRUE);

-- Polestar 4 Snow

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Snow", "Charcoal Nappa", "R20 Aero", FALSE, "2HGCM82633A004351", "KJ24KOQ", 3, 0, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Snow", "Zinc Nappa Leather", "R20 Aero", FALSE, "2HGCM82633A004352", "KJ24KOW", 3, 1000, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Snow", "MicroTech", "R21 Pro", TRUE, "2HGCM82633A004353", "KJ24KOE", 3, 1500, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-dual-long", "Snow", "MicroTech", "R21 Pro", TRUE, "2HGCM82633A004354", "KJ24KOR", 2, 2200, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-dual-long", "Snow", "Tailored Knit", "R21 Pro", TRUE, "2HGCM82633A004355", "KJ24KOT", 2, 3900, TRUE);

-- Polestar 4 Space

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Space", "Charcoal Nappa", "R20 Aero", FALSE, "2HGCM82633A004356", "KJ24KOY", 3, 500, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Space", "Charcoal Nappa", "R21 Sport", TRUE, "2HGCM82633A004357", "KJ24KOU", 3, 1900, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-dual-long", "Space", "Zinc Nappa Leather", "R21 Pro", TRUE, "2HGCM82633A004358", "KJ24KOI", 2, 2900, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-dual-long", "Space", "Tailored Knit", "R22 Perfomance", FALSE, "2HGCM82633A004359", "KJ24KOO", 2, 4100, TRUE);

-- Polestar 4 Magnesium

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Magnesium", "MicroTech", "R21 Pro", FALSE, "2HGCM82633A004361", "KJ24KOP", 3, 1100, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Magnesium", "Tailored Knit", "R21 Sport", TRUE, "2HGCM82633A004362", "KJ24KOA", 3, 1700, TRUE);

-- Polestar 4 Storm

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Storm", "Charcoal Nappa", "R20 Aero", FALSE, "2HGCM82633A004363", "KJ24KOS", 3, 1200, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Storm", "Charcoal Nappa", "R21 Pro", TRUE, "2HGCM82633A004364", "KJ24KOD", 3, 1600, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-dual-long", "Storm", "Tailored Knit", "R21 Sport", FALSE, "2HGCM82633A004365", "KJ24KOF", 2, 2800, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-dual-long", "Storm", "MicroTech", "R22 Perfomance", TRUE, "2HGCM82633A004366", "KJ24KOG", 2, 2900, TRUE);

-- Polestar 4 Electron
INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Electron", "Charcoal Nappa", "R20 Aero", FALSE, "2HGCM82633A004367", "KJ24KOH", 3, 900, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Electron", "MicroTech", "R21 Pro", TRUE, "2HGCM82633A004368", "KJ24KOJ", 3, 1650, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-dual-long", "Electron", "Tailored Knit", "R21 Sport", TRUE, "2HGCM82633A004369", "KJ24KOK", 2, 2300, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-dual-long", "Electron", "Zinc Nappa Leather", "R22 Perfomance", TRUE, "2HGCM82633A004370", "KJ24KOL", 2, 4500, TRUE);

-- Polestar 4 Gold

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Gold", "Charcoal Nappa", "R21 Pro", TRUE, "2HGCM82633A004371", "KJ24KOZ", 3, 1500, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Gold", "MicroTech", "R21 Pro", TRUE, "2HGCM82633A004372", "KJ24KOX", 3, 1600, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-dual-long", "Gold", "Tailored Knit", "R22 Perfomance", TRUE, "2HGCM82633A004373", "KJ24KOC", 2, 3500, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-dual-long", "Gold", "Zinc Nappa Leather", "R22 Perfomance", TRUE, "2HGCM82633A004374", "KJ24KOV", 2, 4800, TRUE);






-- CARS FOR ORDERS

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Space", "Charcoal Nappa", "R20 Aero", FALSE, "3FAHP0HAXAR150104", "KJ25KOA", 3, 500, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Space", "Charcoal Nappa", "R21 Sport", TRUE, "5FNYF3H92FB046915", "KJ25KOS", 3, 1900, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Space", "Charcoal Nappa", "R20 Aero", FALSE, "5YFBU4EE7CP001231", "KJ25KOD", 3, 500, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Space", "Charcoal Nappa", "R21 Sport", TRUE, "WVGBV7AX8CW558030", "KJ25KOF", 3, 1900, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Space", "Charcoal Nappa", "R20 Aero", FALSE, "5NPDH4AE4DH374972", "KJ25KOG", 3, 500, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Space", "Charcoal Nappa", "R21 Sport", TRUE, "JN1HU01S1ET284464", "KJ25KOH", 3, 1900, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Space", "Charcoal Nappa", "R20 Aero", FALSE, "JM1GJ1V50F1274145", "KJ25KOJ", 3, 500, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Space", "Charcoal Nappa", "R21 Sport", TRUE, "1GNES16S946179308", "KJ25KOK", 3, 1900, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Space", "Charcoal Nappa", "R20 Aero", FALSE, "2B3LJ74W28H396359", "KJ25KOL", 3, 500, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Space", "Charcoal Nappa", "R21 Sport", TRUE, "4A4JN2AS2BE070664", "KJ25KOZ", 3, 1900, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Space", "Charcoal Nappa", "R20 Aero", FALSE, "2C3CDXHG0FH736361", "KJ25KOX", 3, 500, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar4-single-long", "Space", "Charcoal Nappa", "R21 Sport", TRUE, "1ZVHT80N085100602", "KJ25KOC", 3, 1900, TRUE);

--

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Space", "Jupiter Nappa", "R21 Plus", FALSE, "1GTHK23G33F295095", "HJ25YQQ", 3, 200, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Space", "Wool", "R22 Sport", TRUE, "1GNSKKKC6FR128857", "HJ25YQW", 3, 700, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Space", "Jupiter Nappa", "R21 Plus", FALSE, "3GNCA13B29S697942", "HJ25YQE", 3, 200, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Space", "Wool", "R22 Sport", TRUE, "WVGCB77L98D051139", "HJ25YQR", 3, 700, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Space", "Jupiter Nappa", "R21 Plus", FALSE, "1B3HB48B17D537295", "HJ25YQT", 3, 200, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Space", "Wool", "R22 Sport", TRUE, "1G2ZG58N874179752", "HJ25YQY", 3, 700, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Space", "Jupiter Nappa", "R21 Plus", FALSE, "1FTZX1768WNA30734", "HJ25YQU", 3, 200, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Space", "Wool", "R22 Sport", TRUE, "WBAVB13556KX59878", "HJ25YQI", 3, 700, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Space", "Jupiter Nappa", "R21 Plus", FALSE, "4T1BF1FK5DU229743", "HJ25YQO", 3, 200, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Space", "Wool", "R22 Sport", TRUE, "2FMDK4JC1EBA49639", "HJ25YQP", 3, 700, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Space", "Jupiter Nappa", "R21 Plus", FALSE, "1HGEM227X1L050874", "HJ25YQA", 3, 200, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Space", "Wool", "R22 Sport", TRUE, "2CNBJ634826937160", "HJ25YQS", 3, 700, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Space", "Jupiter Nappa", "R21 Plus", FALSE, "5UXFA93586LE97620", "HJ25YQD", 3, 200, TRUE);

INSERT INTO car(model_code_fk, color, interior_color, wheels, towing_hitch, vin_code, reg_number, warranty_years, modifications_price, preassembled)
VALUES ("polestar3-single-long", "Space", "Wool", "R22 Sport", TRUE, "2G1WG5E33D1127107", "HJ25YQF", 3, 700, TRUE);


-- CAR ORDERS

INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(114, 1, "2024-01-01", TRUE, 57150, "Visa Credit", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(115, 1, "2024-01-01", TRUE, 57150, "Visa Credit", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(116, 1, "2024-01-01", TRUE, 57150, "Visa Credit", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(117, 1, "2024-01-01", TRUE, 57150, "Visa Credit", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(118, 1, "2024-01-01", TRUE, 57150, "Visa Credit", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(119, 1, "2024-01-01", TRUE, 57150, "Visa Credit", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(120, 1, "2024-01-01", TRUE, 57150, "Visa Credit", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(121, 1, "2024-01-01", TRUE, 57150, "Visa Credit", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(122, 1, "2024-01-01", TRUE, 57150, "Visa Credit", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(123, 1, "2024-01-01", TRUE, 57150, "Visa Credit", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(124, 1, "2024-01-01", TRUE, 57150, "Visa Credit", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(125, 1, "2024-01-01", TRUE, 57150, "Visa Credit", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(126, 2, "2024-03-08", FALSE, 57150, "Cash", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(127, 2, "2024-03-08", FALSE, 57150, "Cash", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(128, 2, "2024-03-08", FALSE, 57150, "Cash", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(129, 2, "2024-03-08", FALSE, 57150, "Cash", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(130, 2, "2024-03-08", FALSE, 57150, "Cash", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(131, 2, "2024-03-08", FALSE, 57150, "Cash", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(132, 2, "2024-03-08", FALSE, 57150, "Cash", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(133, 2, "2024-03-08", FALSE, 57150, "Cash", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(134, 2, "2024-03-08", FALSE, 57150, "Cash", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(135, 2, "2024-03-08", FALSE, 57150, "Cash", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(136, 2, "2024-03-08", FALSE, 57150, "Cash", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(137, 2, "2024-03-08", FALSE, 57150, "Cash", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(138, 2, "2024-03-08", FALSE, 57150, "Cash", "Completed");
INSERT INTO car_order(car_id_fk, customer_id_fk, time_of_purchase, delivery, final_price, payment_method, status) 
VALUES(139, 2, "2024-03-08", FALSE, 57150, "Cash", "Completed");



-- CUSTOMIZE_OPTIONS TABLE FILLING WITH OPTIONS (INDEPENDENT)

-- Color

INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 2", "color", "Snow", 0);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 2", "color", "Space", 500);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 2", "color", "Midnight", 300);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 2", "color", "Thunder", 200);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 2", "color", "Magnesium", 0);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 2", "color", "Jupiter", 300);

INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 3", "color", "Snow", 0);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 3", "color", "Space", 700);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 3", "color", "Midnight", 300);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 3", "color", "Thunder", 400);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 3", "color", "Magnesium", 100);

INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 4", "color", "Snow", 0);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 4", "color", "Space", 1000);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 4", "color", "Magnesium", 300);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 4", "color", "Gold", 2000);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 4", "color", "Electron", 800);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 4", "color", "Storm", 600);

-- Interior

INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 2", "interior_color", "Embossed textile", 0);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 2", "interior_color", "Charcoal WeaveTech", 500);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 2", "interior_color", "Slate WeaveTech", 600);

INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 3", "interior_color", "MicroTech", 0);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 3", "interior_color", "Charcoal Nappa", 300);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 3", "interior_color", "Jupiter Nappa", 700);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 3", "interior_color", "Zinc Nappa", 1000);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 3", "interior_color", "Wool", 500);

INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 4", "interior_color", "MicroTech", 0);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 4", "interior_color", "Charcoal Nappa", 500);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 4", "interior_color", "Zinc Nappa Leather", 1500);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 4", "interior_color", "Tailored Knit", 2000);

-- Wheels

INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 2", "wheels", "R19 Aero", 0);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 2", "wheels", "R20 Pro", 850);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 2", "wheels", "R20 Perfomance", 1600);

INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 3", "wheels", "R21 Plus", 0);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 3", "wheels", "R22 Sport", 900);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 3", "wheels", "R22 Perfomance", 2100);

INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 4", "wheels", "R20 Aero", 0);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 4", "wheels", "R21 Sport", 500);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 4", "wheels", "R21 Pro", 750);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 4", "wheels", "R22 Perfomance", 2200);

-- Towing hitch

INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 2", "towing_hitch", "Yes", 200);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 3", "towing_hitch", "Yes", 300);
INSERT INTO customize_options(model, option_type, option_name, price)
VALUES("Polestar 4", "towing_hitch", "Yes", 400);

-- CHARGER_MODELS

INSERT INTO charger_model VALUES (1, "7.4kW Regular Charger", "CCS Connector", 7400, 7, 400);
INSERT INTO charger_model VALUES (2, "7.4kW Long Charger", "CCS Connector", 7400, 15, 550);
INSERT INTO charger_model VALUES (3, "11kW Regular Charger", "CCS Connector", 11000, 7, 600);
INSERT INTO charger_model VALUES (4, "11kW Long Charger", "CCS Connector", 11000, 15, 800);

-- CHARGER_ORDERS

INSERT INTO charger_order VALUES(1, 1, 2, 1, 1, 550, "Completed", "0000127669");
INSERT INTO charger_order VALUES(2, 2, 4, 0, 0, 800, "Awaiting confirmation", "0000127670");
INSERT INTO charger_order VALUES(3, 1, 3, 1, 0, 600, "Completed", "0000127671");