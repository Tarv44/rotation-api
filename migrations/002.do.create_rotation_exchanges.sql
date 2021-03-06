CREATE TABLE rotation_exchanges (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
    modified TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by INTEGER REFERENCES rotation_users(id) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(200)
);