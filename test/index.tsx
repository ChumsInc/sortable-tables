import React from 'react';
import {createRoot} from "react-dom/client";
import TestTable from "./TestTable";

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <TestTable />
    </React.StrictMode>
);
