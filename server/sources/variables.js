const waiters_Fields_Select = [
  "first_name",
  "last_name",
  "phone",
  "birthday",
  "email",
  "w_password",
  "gender",
  "avg_rating",
  "status",
];
const waiter_Fields_Select = [
  "id",
  "first_name",
  "last_name",
  "phone",
  "birthday",
  "email",
  "gender",
  "avg_rating",
  "face_url",
];

const employers_Fields_Select = [
  "company_name",
  "manager",
  "manager_phone",
  "email",
  "e_password",
  "about",
  "avg_rating",
  "status",
];

const company_Fields_Select = [
  "id",
  "company_name",
  "manager",
  "manager_phone",
  "email",
  "about",
  "avg_rating",
];

const events_Fields = [
  "company_id",
  "e_date",
  "e_time",
  "e_duration",
  "location",
  "suite",
  "event_description",
  "waiters_amount",
  "salary",
  "is_global",
  "has_sleep",
];
const waiter_ditails = [
  "first_name",
  "last_name",
  "phone",
  "birthday",
  "email",
  "gender",
  "avg_rating",
]; //Query for waiter
const employer_ditails = [
  "id",
  "company_name",
  "manager",
  "manager_phone",
  "email",
  "about",
  "avg_rating",
]; //Query for employer

const company_insert = [
  "company_name",
  "manager",
  "manager_phone",
  "email",
  "e_password",
  "about",
  "status",
];
const waiter_insert = [
  "first_name",
  "last_name",
  "phone",
  "birthday",
  "email",
  "w_password",
  "gender",
  "status",
];
export {
  waiter_ditails,
  employer_ditails,
  events_Fields,
  waiters_Fields_Select,
  employers_Fields_Select,
  company_insert,
  waiter_insert,
  waiter_Fields_Select,
  company_Fields_Select,
};
