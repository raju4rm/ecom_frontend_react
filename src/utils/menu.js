export const menuList=[
    {
        label   :   'MASTER DATA',
        name    :   'Level - 1',
        url     :   '#',
        active  :   'Level - 1',
        id      :   'L1',
        sub_menu:   [
            {
                name    :   'Level sub - 1',
                url     :   '#',
                active  :   'Level sub - 1',
                id      :   'LS1',   
            },
            {
                name    :   'Level sub - 2',
                url     :   '#',
                active  :   'Level sub - 2',
                id      :   'LS2',  
            },
            {
                name    :   'Level sub - 3',
                url     :   '#',
                active  :   'Level sub - 3',
                id      :   'LS3', 
                sub_menu:   [
                    {
                        name    :   'Level sub sub - 1',
                        url     :   '#',
                        active  :   'Level sub sub - 1',
                        id      :   'LSS3', 
                        
                    }

                ] 
            }
        ]


    },
    {
        label   :   'MULTI LEVEL EXAMPLE - 2',
        name    :   'Level - 2',
        url     :   '#',
        active  :   'Level - 2',
        id      :   'L2',
    }
]