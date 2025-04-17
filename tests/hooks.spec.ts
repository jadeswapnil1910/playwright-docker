import {test} from "@playwright/test";
import { log } from "console";



test.beforeAll(async () => {
    console.log("Before ALL");
})

test.beforeEach( async () => {
    console.log("Before Each");
})

test.afterEach( async() => {
    console.log("After Each");
})

test.afterAll( async ()=> {
    console.log("After ALL");
})

test("Test 1 hook", async ()=> {

    console.log("Test 1");
})

test("Test 2 hook", async ()=> {

    console.log("Test 2");
})

