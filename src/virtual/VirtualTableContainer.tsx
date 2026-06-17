import styled from "@emotion/styled";

const VirtualTableContainer = styled.div`
    height: calc(100vh - 100px);
    max-height: calc(100vh - 100px);
    width: 100%;
    transition: height 0.2s ease-in-out;

    .table {
        white-space: nowrap;
        //height: 70vh;
        thead tr {
            th, td {
                background-color: var(--bs-table-bg) !important;
                border-bottom-width: 1px;
                border-color: var(--bs-border-color);
                box-shadow: var(--bs-box-shadow);
            }
        }
    } 
`;

export default VirtualTableContainer;
