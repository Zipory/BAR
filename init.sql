
-- Use the database
USE bar;

-- Create the `companies` table
CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    manager VARCHAR(50) NOT NULL,
    manager_phone VARCHAR(30),
    email VARCHAR(50),
    e_password VARCHAR(100),
    about VARCHAR(200),
    avg_rating DECIMAL(2,1),
    status VARCHAR(20)
);

-- Create the `events` table
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    e_date DATE NOT NULL,
    e_time TIME NOT NULL,
    e_duration DECIMAL(4,2),
    location VARCHAR(50),
    suite VARCHAR(5),
    event_description VARCHAR(200),
    waiters_amount INT,
    salary DECIMAL(7,2),
    is_global TINYINT(1),
    has_sleep TINYINT(1),
    approved_waiters INT,
    status TEXT,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Create the `waiters` table
CREATE TABLE waiters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(30),
    birthday DATE,
    email VARCHAR(50),
    w_password VARCHAR(100),
    gender ENUM('Male', 'Female', 'Other'),
    avg_rating DECIMAL(2,1),
    status VARCHAR(20),
    face_url TEXT
);

-- Create the `requests` table
CREATE TABLE requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    waiter_id INT NOT NULL,
    status VARCHAR(20),
    rating_w DECIMAL(2,1),
    rating_c DECIMAL(2,1),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (waiter_id) REFERENCES waiters(id) ON DELETE CASCADE
);


DELIMITER $$

CREATE TRIGGER update_waiter_avg_rating_on_rating_update
AFTER UPDATE ON requests
FOR EACH ROW
BEGIN
    IF NEW.rating_w <> OLD.rating_w THEN
        UPDATE waiters
        SET avg_rating = (
            SELECT AVG(rating_w)
            FROM requests
            WHERE waiter_id = NEW.waiter_id
        )
        WHERE id = NEW.waiter_id;
    END IF;
END $$

DELIMITER ;



DELIMITER $$

CREATE TRIGGER update_avg_rating_after_request_update
AFTER UPDATE ON requests
FOR EACH ROW
BEGIN
    UPDATE companies
    SET avg_rating = (
        SELECT AVG(rating_c)
        FROM requests
        JOIN events ON requests.event_id = events.id
        WHERE events.company_id = companies.id
    )
    WHERE companies.id = (
        SELECT events.company_id
        FROM events
        WHERE events.id = NEW.event_id
    );
END $$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER update_approved_waiters_after_requests_update
AFTER UPDATE ON requests
FOR EACH ROW
BEGIN
    IF NEW.status <> OLD.status THEN
        UPDATE events
        SET approved_waiters = (
            SELECT COUNT(*) 
            FROM requests
            WHERE event_id = NEW.event_id AND status = 'Approved'
        )
        WHERE id = NEW.event_id;
    END IF;
END $$

DELIMITER ;