import React from 'react'
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link } from 'react-router-dom';
import config from '../utils/config';

function BreadCrumbComponent({BreadCrumbValue,module}) {
    document.title = module+' | '+config.siteName
    let BreadCrumbItem=[];
    var item;
    BreadCrumbValue.map((value,index) => {
        if ('template' in value) {
            item = {
                label: value.label,
                template: () => <Link href={`${value.template[0].link}`} className="text-primary font-semibold">{value.template[0].linkLabel}</Link>
            }
        }else{
            item = {
                label: value.label
            }
        }
        BreadCrumbItem.push(item)
    })
    const home = { icon: 'pi pi-home', url: config.baseUrl+'dashboard' };

    return (
        <>
            <section className="content-header">
                <div className="container-fluid ">
                    <div className="row mb-2">
                        <div className="col-sm-6 custom_page_head">
                            <h1>{module}</h1>
                        </div>
                        <div className="col-sm-6">
                            <BreadCrumb model={BreadCrumbItem} home={home}  className="custom-breadcrumb"/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BreadCrumbComponent