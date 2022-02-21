import React from "react";
import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);

function ContactList(props) {
  if (!props.contacts || !props.contacts.length) {
    return <div>No contacts</div>;
  }
  return (
    <ul>
      {/*   {[...props.contacts].reverse().map(({ name, id }) => ( */}
      {/* Failing test */}
      {props.contacts.map(({ name, id }) => (
        <li key={id} data-testid="contact-name">
          {name}
        </li>
      ))}
    </ul>
  );
}
//===================================
test("Displays no contacts", () => {
  render(<ContactList />);
  expect(screen.getByText(/no contacts/i)).toBeInTheDocument();
});
//===================================
test("renders contacts", () => {
  const dummy = [
    { id: 1, name: "Bob" },
    { id: 2, name: "Marcy" },
  ];
  render(<ContactList contacts={dummy} />);
  const contactNames = screen
    .getAllByTestId("contact-name")
    .map((li) => li.textContent);
  const testDummy = dummy.map((c) => c.name);
  contactNames.forEach((name) => {
    expect(dummy.find((c) => c.name === name)).toBeTruthy();
  });
  expect(contactNames).toEqual(testDummy);
  expect(contactNames).toMatchSnapshot(`Array["Bob", "Marcy"]`);
});
//===================================
//===================================
//===================================
//===================================
//===================================
//===================================
//===================================
//===================================
//===================================
export default ContactList;
