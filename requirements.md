# Requirements
## Done
  - ✅ Add any kind of data. (endpoint /add_record)
  - ✅ Add Body fat data. (i.e. date and percent data). (endpoint /add_bf_record)
  - ✅ Create form
  - ✅ Get forms
  - ⏳ Fill Form
    - validate if input data on request contains all fields the form expects

## Backlog
  - Fill form
  - Get fillments of a form
  - Signup
  - Associate a form with a specific user
  - Allow a form to be associated with many users
  - Provide access of a form to other users (share form)
  - Login
  - Get csv on email

# Improvements
  - It is not possible to associate a name to a form.

# Technical debts
  - database is persisting fields that were not mapped on DTO.
    - Ex: a form field contains only a field which is called "name". If a provide a map which
    also contains a field called "blabla", "blabla" will be persisted.