import React,{ useState }  from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nano/theme.css';
import 'primeicons/primeicons.css';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Paginator } from 'primereact/paginator';


const Test = () => {
    const [isCollapsFilter,setIsCollapsFilter]= useState(true);
    const toggleFilter = () => {
        setIsCollapsFilter(!isCollapsFilter);
        console.log(isCollapsFilter)
    }

    // breadcrumb start
    const items = [
        { label: 'Components' },
        {
            label: 'Form',
            template: () => <Link href="/inputtext"><a className="text-primary font-semibold">Form</a></Link>
        },
        {
            label: 'InputText',
            template: () => <Link href="/inputtext"><a className="text-primary font-semibold active">InputText</a></Link>
        }
    ];
    const home = { icon: 'pi pi-home', url: 'https://primereact.org' };
    // breadcrumb end


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

    // loading button start
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    //loading button end 

    // select start
    const animatedComponents = makeAnimated();

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [isFocused, setIsFocused] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const handleChange = (option) => setSelectedOption(option);

    // select end

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [totalRecords, setTotalRecords] = useState(1000);
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
      };
    return ( 
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid ">
                        <div className="row mb-2">
                        <div className="col-sm-6 custom_page_head">
                            <h1>General Form</h1>
                        </div>
                        <div className="col-sm-6">
                        <BreadCrumb model={items} home={home}  className="custom-breadcrumb"/>

                        </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                        <div className={`card card-default custom-card-default ${isCollapsFilter?'collapsed-card':''}`}>
                            <div className="card-header">
                                <p className='card-title'>
                                    <strong>
                                        Filter Roles
                                    </strong>
                                </p>
                                <div className="card-tools">
                                    <Button text icon={` ${isCollapsFilter? 'pi pi-plus' : 'pi pi-minus' }`} onClick={toggleFilter} /> 
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="form-group col-md-4">
                                        <FloatLabel>
                                            <InputText className="form-control mt-2" id="username" value={value} onChange={(e) => setValue(e.target.value)} />
                                            <label for="username" className='custom_label'>Username</label>
                                        </FloatLabel>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <FloatLabel>
                                            <InputText className="form-control mt-2" id="username" value={value} onChange={(e) => setValue(e.target.value)} />
                                            <label for="username" className='custom_label'>Username1</label>
                                        </FloatLabel>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <div className="floating-label-select">
                                            <label className={`floating-label ${isFocused || selectedOption ? 'focused' : ''}`}>
                                                Select an option
                                            </label>
                                            <Select className="mt-2"
                                                defaultValue={selectedOption}
                                                onChange={handleChange}
                                                options={options}
                                                components={animatedComponents}
                                                menuPortalTarget={document.body} 
                                                isDisabled={isDisabled}
                                                isLoading={isLoading}
                                                isClearable={isClearable}
                                                isRtl={isRtl}
                                                isSearchable={isSearchable}
                                                isMulti={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                    

                            </div>
                            <div className="card-footer" style={{textAlign:'right'}}>
                                <Button label="Reset" severity="warning" rounded icon="pi pi-times" loading={loading} onClick={load} /> 
                                &nbsp;
                                <Button label="Submit" severity="success" rounded icon="pi pi-check" loading={loading} onClick={load} /> 
                                
                            </div>
                        </div>
                </section>


                <section className="content">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-12'>
                                <div className='card custom-card'>
                                    <div class="card-header">
                                        <p className='card-title'>
                                            <strong>
                                                Roles
                                            </strong>
                                        </p>
                                        
                                    </div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-sm-12'>
                                                <DataTable value={customers}  sortMode="multiple" rows={15} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="400px"
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

                                                <Paginator first={first} rows={rows} totalRecords={totalRecords} rowsPerPageOptions={[5, 10, 20, 50]} onPageChange={onPageChange} />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </section>
            </div>
        </>
    )
}

export default Test