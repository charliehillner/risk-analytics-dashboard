ALTER TABLE simulation
    ADD COLUMN value_at_risk_95 NUMERIC(14, 2),
    ADD COLUMN conditional_value_at_risk_95 NUMERIC(14, 2);