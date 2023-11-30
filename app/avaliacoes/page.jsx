"use client";
// pages/Charts.js
import React, { useEffect, useState } from "react";
import { Button, Card, Spinner, Tab, Tabs } from "react-bootstrap";
import AvaliacoesLista from "@/components/AvaliacoesLista";

const Charts = () => {

  return (
    <div className="row">
      <AvaliacoesLista isAdminPage='1' />
    </div>
  );
};

export default Charts;
