import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import UserList from "./UsersList";

describe("Render UserList", () => {
  beforeEach(() =>
    render(
      <UserList />
    )
  );

  it("Render Header Name Table", () => {
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it("Render Header Email Table", () => {
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it("Render Header Phone Table", () => {
    expect(screen.getByText('Telefono')).toBeInTheDocument();
  });

  it("Render Header Country Table", () => {
    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  it("Render Body Name Table", () => {
    expect(screen.getByText('Juan')).toBeInTheDocument();
  });
});