import React from 'react'
import { Link } from 'react-router-dom';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nano/theme.css';
import { Button } from 'primereact/button';

const list = () => {
    const customers=[
        {
            id: 1000,
            name: 'James Butt1',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt1',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt1',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt1',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt1',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt1',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt1',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt1',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt1',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt1',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt1',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt1',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
        {
            id: 1000,
            name: 'James Butt',
            country:'Algeria',
            company: 'Benton, John B Jr',
            date: '2015-09-13',
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: 'ionibowcher.png'
            
        },
    ]
    return ( 
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>General Form</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item">
                            <Link to="/login"  > Contact us </Link> 
        
                            </li>
                            <li className="breadcrumb-item active">General Form</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                    <DataTable value={customers} paginator sortMode="multiple" rows={15} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="400px"
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}" stripedRows>
                        <Column sortable field="name" header="Name" style={{ width: '25%' }}></Column>
                        <Column field="country" header="Country" style={{ width: '25%' }}></Column>
                        <Column field="company" header="Company" style={{ width: '25%' }}></Column>
                        <Column field="representative" header="Representative" style={{ width: '25%' }}></Column>
                        <Column field="representative" header="Representative" style={{ width: '25%' }}></Column>
                        <Column field="representative" header="Representative" style={{ width: '25%' }}></Column>
                        <Column field="representative" header="Representative" style={{ width: '25%' }}></Column>
                        <Column field="representative" header="Representative" style={{ width: '25%' }}></Column>
                        <Column field="representative" header="Representative" style={{ width: '25%' }}></Column>
                        <Column field="representative" header="Representative" style={{ width: '25%' }}></Column>
                    </DataTable>
                    </div>
                </section>
            </div>
        </>
    )
}

export default list