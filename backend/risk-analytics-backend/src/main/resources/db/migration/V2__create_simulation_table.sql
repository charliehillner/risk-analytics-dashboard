DROP TABLE IF EXISTS simulation;

CREATE TABLE simulation (
        id BIGSERIAL PRIMARY KEY,
        created_at TIMESTAMP NOT NULL,
        initial_capital NUMERIC(14, 2) NOT NULL,
        monthly_contribution NUMERIC(14, 2) NOT NULL,
        expected_return DOUBLE PRECISION NOT NULL,
        volatility DOUBLE PRECISION NOT NULL,
        years INTEGER NOT NULL,
        num_runs INTEGER NOT NULL,
        mean_final_value NUMERIC(14, 2),
        median_final_value NUMERIC(14, 2),
        percentile_5 NUMERIC(14, 2),
        percentile_95 NUMERIC(14, 2),
        loss_probability DOUBLE PRECISION
);