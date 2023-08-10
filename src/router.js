import { createRouter, createWebHistory } from "vue-router/dist/vue-router";

const routes = [
    {
        path: "/",
        alias: "/home",
        name: "home",
        component: () => import("./components/Home.vue"),
    },
    {
        path: "/side-navbar",
        component: () => import("./components/SideHomeView.vue"),
        children: [
            {
                path: "dashboard",
                name: "side navbar dashboard",
                component: () => import("./components/Dashboard.vue"),
            },
            {
                path: "grant",
                name: "side navbar grant",
                component: () => import("./components/GrantCallList.vue"),
            },
            {
                path: "project",
                name: "side navbar project",
                component: () => import("./components/Project.vue"),
                children: [
                    {
                        path: "research-details",
                        name: "side navbar research details",
                        component: () => import("./components/ResearchDetails.vue"),
                    },
                    {
                        path: "research-milestone",
                        name: "side navbar research milestone",
                        component: () => import("./components/ResearchMilestone.vue"),
                    },
                    {
                        path: "placeholder",
                        name: "side navbar placeholder",
                        component: () => import("./components/Placeholder.vue"),
                    }
                ]
            },
            {
                path: "test",
                name: "test",
                component: () => import("./components/Test.vue"),
            }
        ]
    },
    {
        path: "/top-navbar",
        component: () => import("./components/TopHomeView.vue"),
        children: [
            {
                path: "dashboard",
                name: "top navbar dashboard",
                component: () => import("./components/Dashboard.vue"),
            },
            {
                path: "grant",
                name: "top navbar grant",
                component: () => import("./components/GrantCallList.vue"),
            },
            {
                path: "project",
                name: "top navbar project",
                component: () => import("./components/Project.vue"),
                children: [
                    {
                        path: "research-details",
                        name: "top navbar research details",
                        component: () => import("./components/ResearchDetails.vue"),
                    },
                    {
                        path: "research-milestone",
                        name: "top navbar research milestone",
                        component: () => import("./components/ResearchMilestone.vue"),
                    },
                    {
                        path: "placeholder",
                        name: "top navbar placeholder",
                        component: () => import("./components/Placeholder.vue"),
                    }
                ]
            },
            {
                path: "test",
                name: "test",
                component: () => import("./components/Test.vue"),
            }
        ]
    }
    // {
    //     path: "/dashboard",
    //     name: "dashboard",
    //     component: () => import("./components/Dashboard.vue"),
    // },
    // {
    //     path: "/grant",
    //     name: "grant",
    //     component: () => import("./components/GrantCallList.vue"),
    // },
    // {
    //     path: "/project",
    //     name: "project",
    //     component: () => import("./components/Project.vue"),
    //     children: [
    //         {
    //             path: "/research-milestone",
    //             name: "research milestone",
    //             component: () => import("./components/ResearchMilestone.vue"),
    //         },
    //         {
    //             path: "/placeholder",
    //             name: "placeholder",
    //             component: () => import("./components/Placeholder.vue"),
    //         }
    //     ]
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;