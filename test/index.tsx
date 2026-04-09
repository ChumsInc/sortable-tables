import React from 'react';
import {createRoot} from "react-dom/client";
import TestVirtualTable from "./product-status/TestVirtualTable";

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <TestVirtualTable/>
    </React.StrictMode>
);
