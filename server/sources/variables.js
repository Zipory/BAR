const waitersFields = [
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

const employersFields = [
  "company_name",
  "manager",
  "manager_phone",
  "email",
  "e_password",
  "about",
  "avg_rating",
  "status",
];

const eventsFields = [
  "employer_fk",
  "e_date",
  "e_time",
  "length",
  "street",
  "suite",
  "event_description",
  "waiters_sum",
  "payment",
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

export {
  waitersFields,
  employersFields,
  eventsFields,
  waiter_ditails,
  employer_ditails,
};
