import { MongoClient, ServerApiVersion } from "mongodb";

//import * as mongodb from 'https://esm.run/mongodb';

//const { MongoClient, ServerApiVersion } = mongodb

const username = "data_apiv2_user_dev";
const password = "CUWRVdv6payITk2B";

const uri = `mongodb+srv://${username}:${password}@data-api-dev.wjpqvc6.mongodb.net/?retryWrites=true&w=majority&appName=data-api-dev`;


class KrDB {
    /**
     * @param {string} tenant - The tenant to use
     * @param {string} project - The project to use
     * @returns {Promise<void>}
     * @constructor
     * @description Initializes the database
    
     */
    constructor(tenant, project) {
        this.tenant = 'tenant_' + tenant;
        this.project = 'project_' + project;
        this.client = undefined;
    }

    async init() {
        this.client = getClient();
        return await initMongodb(this.client, this.tenant, this.project);
    }

    async get(ref_or_record_type, record_id) {
        return await getRecord(
            this.client,
            this.tenant,
            this.project,
            ref_or_record_type,
            record_id,
        );
    }
    async set(record) {
        return await upsertRecord(
            this.client,
            this.tenant,
            this.project,
            record
        );
    }
    async upsert(record) {
        return await upsertRecord(
            this.client,
            this.tenant,
            this.project,
            record
        );
    }
      
    async search(query) {
        return await searchRecords(
            this.client,
            this.tenant,
            this.project,
            query
        );
    }
    async delete(query) {
        return await deleteRecords(
            this.client,
            this.tenant,
            this.project,
            query
        );
    }

    async close() {
        await this.client.close();
    }
}

export const mongodbHelpers = {
    DB: KrDB,
};

// -----------------------------------------------------
//  DB Init
// -----------------------------------------------------

function getClient() {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    let client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
    return client;
}

async function initMongodb(client, tenant, project) {
    /**
     * Initializes the database
     * @param {string} dbName - The name of the database to initialize
     * @param {string} collectionName - The name of the collection to initialize
     * @param {object} sampleDoc - The sample document to insert into the collection
     * @returns {Promise<void>}
     */
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    //await createDatabase(client, tenant, project, {});

    return;
}

async function createDatabase(client, dbName, collectionName, sampleDoc) {
    // Create a new MongoClient instance with the provided URI.
    // It's recommended to use the `useUnifiedTopology: true` option.

    try {
        // Connect to the MongoDB server.
        //await client.connect();

        // Access the specific database. If it doesn't exist, MongoDB will
        // create it once you insert data.
        const db = client.db(dbName);

        // Access the specific collection. Like the database, if the collection
        // doesn't exist, it will be created upon data insertion.
        const collection = db.collection(collectionName);

        // Insert the sample document into the collection.
        // This is the operation that effectively creates the database and collection.
        const insertResult = await collection.insertOne(sampleDoc);
    } catch (err) {
        // If any error occurs during the process, it will be caught here.
        console.error("An error occurred:", err);
    } finally {
        // The finally block ensures that the client will close when you finish/error.
        // This is crucial to prevent hanging connections.
    }
}

// -----------------------------------------------------
//  DB Operations
// -----------------------------------------------------

async function getRecord(client, tenant, project, ref_or_record_type, record_id) {
    /**
     * Gets a record from the database
     * @param {string} tenant - The tenant to get the record from
     * @param {string} project - The project to get the record from
     * @param {string} record_type - The type of the record to get
     * @param {string} record_id - The id of the record to get
     */

    let record_type = ref_or_record_type?.["@type"] || ref_or_record_type;
    record_id = ref_or_record_type?.["@id"] || record_id;

    let record = undefined
    try {
      
        const db = client.db(tenant);
        const collection = db.collection(project);

        const query = {
            "@type": record_type,
            "@id": record_id
        }
        
        record = await collection.findOne(query);
        
    } catch (err) {
        console.error("An error occurred while getting the document:", err);
    }
    return record
}

async function searchRecords(client, tenant, project, query) {
    /**
     * Gets a record from the database
     * @param {string} tenant - The tenant to get the record from
     * @param {string} project - The project to get the record from
     * @param {string} record_type - The type of the record to get
     * @param {string} record_id - The id of the record to get
     */

    

    let records = undefined
    try {

        const db = client.db(tenant);
        const collection = db.collection(project);


        records = await collection.find(query).toArray();

    } catch (err) {
        console.error("An error occurred while getting the document:", err);
    }
    return records
}

async function setRecord(client, tenant, project, record) {
    /**
     * Sets a record in the database
     * @param {string} tenant - The tenant to set the record in
     * @param {string} project - The project to set the record in
     * @param {object} record - The record to set
     * @returns {Promise<void>}
     */

    let insertResult = undefined
    try {

        const db = client.db(tenant);
        const collection = db.collection(project);

        insertResult = await collection.insertOne(record);
        
    } catch (err) {
        console.error("An error occurred while writing the document:", err);
    }
    return insertResult
}
async function upsertRecord(client, tenant, project, record) {
    /**
     * Sets a record in the database
     * @param {string} tenant - The tenant to set the record in
     * @param {string} project - The project to set the record in
     * @param {object} record - The record to set
     * @returns {Promise<void>}
     */

    let insertResult = undefined
    try {

        const db = client.db(tenant);
        const collection = db.collection(project);

        // The update document must use update operators like $set.
        const updateDoc = {
            $set: record,
        };


        let query = {
            "@type": record?.['@type'],
            "@id": record?.['@id']
        }
        
        // The options object with upsert: true is the key to this operation.
        const options = { upsert: true };

        insertResult = await collection.updateOne(query, updateDoc, options);

    } catch (err) {
        console.error("An error occurred while writing the document:", err);
    }
    return insertResult
}


async function deleteRecords(client, tenant, project, query) {
    /**
     * Gets a record from the database
     * @param {string} tenant - The tenant to get the record from
     * @param {string} project - The project to get the record from
     * @param {string} record_type - The type of the record to get
     * @param {string} record_id - The id of the record to get
     */



    let deleteResult = undefined
    try {

        const db = client.db(tenant);
        const collection = db.collection(project);


        deleteResult = await collection.deleteMany(query);

    } catch (err) {
        console.error("An error occurred while getting the document:", err);
    }
    return deleteResult
}
