


import { mongodbHelpers } from './mongodbHelpers/mongodbHelpers.js'


async function test(){

    let db = new mongoHelpers.DB('tenant1', 'project1')
    await db.init()


    let record = {
            "@context": "https://schema.org/",
            "@type": "Thing",
            "@id": "thing1",
            "name": "thing1"
        }

    let result = await db.set(record)

    console.log(result)

    let r2 = await db.get('Thing', 'thing1')
    console.log(r2)

    let r3 = await db.search({"@type": "Thing"})
    console.log('r3', r3)


    //let r4 = await db.delete({"@type": "Thing"})
    console.log('r4', r4)


}


test()