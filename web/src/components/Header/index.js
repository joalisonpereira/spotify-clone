import React from 'react';

import { Container, Search, User } from './styles';

export default function Header() {
  return (
    <Container>
      <Search>
        <input placeholder="Search" />
      </Search>
      <User>
        <img src="https://avatars3.githubusercontent.com/u/26156206?v=4" alt="Avatar" />
        <span>Joalison Pereira</span>
      </User>
    </Container>
  );
}
