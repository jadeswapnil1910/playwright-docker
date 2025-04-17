import {test, expect, Page} from "@playwright/test";

let page;

test.beforeAll( async ()=> {

    console.log("-------------------------------------");
    console.log("        Database Connection");
    console.log("-------------------------------------");
})

test.afterAll( async ()=> {
    console.log("-------------------------------------");
    console.log("        Database Disconnect");
    console.log("-------------------------------------");
})

test.describe("  ***  Test Suite 1 ***  ", ()=> {

    test.beforeEach( async()=> {
        console.log("---> Login App");
    })
    
    test.afterEach( async()=> {
        console.log("---> Logout App");
    })
    
    
    test("Test 1", async ()=> {
    
        console.log("Test Block 1");
    })
    
    test.fixme("Test 2", async ()=> {
    
        console.log("Test Block 2");
    })

})

test.describe("  ***  Test Suite 2 ***  ", ()=> {

    test.beforeAll( async ()=> {

        
        console.log("        Database Connection");
        
    })
    
    test.afterAll( async ()=> {
        
        console.log("        Database Disconnect");
        
    })

    test("Test 3", async ({page, browserName})=> {

        test.skip(browserName === "chromium", "Skipped in Chrome")

        console.log("Test Block 3");
    })
    
    test.skip("Test 4", async ()=> {
    
        
        console.log("Test Block 4");
    })
    

})



