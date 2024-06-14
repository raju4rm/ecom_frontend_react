export const menuList=[
    {
        label   :   'MASTER DATA',
        name    :   'Level - 1',
        url     :   '#',
        active  :   'Level - 1',
        id      :   'L1',
        icon    :   'fa fa-th-large',
        sub_menu:   [
            {
                name    :   'Level sub - 1',
                url     :   '#',
                active  :   'Level sub - 1',
                id      :   'LS1',   
                icon    :   'fa fa-angle-double-right',
            },
            {
                name    :   'Level sub - 2',
                url     :   '#',
                active  :   'Level sub - 2',
                id      :   'LS2',  
                icon    :   'fa fa-angle-double-right',
            },
            {
                name    :   'Level sub - 3',
                url     :   '#',
                active  :   'Level sub - 3',
                id      :   'LS3',
                icon    :   'fa fa-angle-double-right', 
                sub_menu:   [
                    {
                        name    :   'Level sub sub - 1',
                        url     :   '#',
                        active  :   'Level sub sub - 1',
                        id      :   'LSS3',
                        icon    :   'fa fa-angle-right', 
                        
                    }

                ] 
            }
        ]


    },
    {
        label   :   'Super Admin ',
        name    :   'Role Management',
        url     :   '/role',
        active  :   'Role Management', 
        id      :   'Role_Management',
        icon    :   'fa fa-check-square',
    }
]