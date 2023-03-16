import React from "react";
import { List } from "antd-mobile";
import { Link } from "wouter";

const Home = (): JSX.Element => (
  <>
    <List>
      <List.Item>
        <Link href="/heaters">Gestion des chauffages</Link>
      </List.Item>
      <List.Item>
        <Link href="/shutters">Gestion des volets</Link>
      </List.Item>
    </List>
  </>
);

export default Home;
