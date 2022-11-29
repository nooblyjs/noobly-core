'use strict';
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');

/**
 * File Manager Azure Provider
 */
module.exports = function (parameters) {

    /** Initiate the object */
    var _controller = {};

    const connectionstring = ((parameters['connectionstring'] != null) ? parameters['connectionstring'] : '');  // The connectionstring
    const container = ((parameters['container'] != null) ? parameters['container'] : '');  // The container

    // Instantiate the service client
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionstring);

    /**
     * Create a Container
     * @param  container
     */
    _controller.createContainer = async function (container) {
        var containerExists = false;
        for await (const containerItem of blobServiceClient.listContainers({
            includeDeleted: false,
            includeMetadata: true,
            includeSystem: true,
        })) {

            // ContainerItem
            if (containerItem.name == container) {
                containerExists = true;
            }
        }
        if (!containerExists){
            await blobServiceClient.createContainer(container, {access: 'container'});
        }
    }
    _controller.createContainer(container);

    /**
     * Create a file
     * @param {String} filePath
     * @param {object} content
     * @param {function} callback
     */
    _controller.create = async function (filePath, content, callback) {
        const containerClient = blobServiceClient.getContainerClient(container);
        const blobName = filePath;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
    }

    /**
     * Append to file
     * @param {String} filePath
     * @param {object} content
     * @param {function} callback
     */
    _controller.append = function (filePath, content, callback) {
        fs.appendFile(filePath, content, callback);
    }

    /**
    * Rename to file
    * @param {String} filePath
    * @param {String} newfilePath
    * @param {function} callback
    */
    _controller.rename = async function (filePath, newfilePath, callback) {
        // create container clients
        const sourceContainerClient = blobServiceClient.getContainerClient(container);
        const sourceBlobClient = await sourceContainerClient.getBlobClient(filePath);
        const destinationBlobClient = await destinationContainerClient.getBlobClient(newfilePath);
        const copyPoller = await destinationBlobClient.beginCopyFromURL(sourceBlobClient.url);
        await copyPoller.getResult();
        callback(true)
    }

    /**
     * Delete a file
     * @param {String} filePath
     * @param {function} callback
    */
    _controller.delete = async function (filePath, callback) {
        const containerClient = blobServiceClient.getContainerClient(container);
        const blockBlobClient = await containerClient.getBlockBlobClient(filePath);
        await blockBlobClient.rename({ deleteSnapshots: 'include' });
    }

    /**
     * Read a File
     * @param {String} filePath
     * @param {function} callback
    */
    _controller.readFile = async function (filePath, callback) {
        const containerClient = blobServiceClient.getContainerClient(container);
        const blobClient = containerClient.getBlobClient(filePath);
        const downloadBlockBlobResponse = await blobClient.download();
        const downloaded = (
            await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
        ).toString();
        callback(downloaded);
    }

    /**
     * Read a Directory
     * @param {String} directory
     * @param {function} callback
     */
    _controller.readDirectory = function (directory, callback) {
        const containerClient = blobServiceClient.getContainerClient(container);
        callback(containerClient.listBlobsFlat());
    }

    /**
     * File Exists
     * @param {String} filePath
     * @param {function} callback
    */
    _controller.exists = function (filePath, callback) {
        blobServiceClient.doesBlobExist(container, filePath, function (err, data) {
            if (!error) {
                callback(data.exists)
            }
        });
    }

    return _controller;
};

