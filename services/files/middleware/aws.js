'use strict';
const aws = require('aws-sdk');
const fs = require('fs');

/**
 * File Manager local provider
 */
module.exports = function (parameters) {

    /** Read and confirm all the required parameters */
    var _controller = {};
    const accesskey = ((parameters['accesskey'] != null) ? parameters['accesskey'] : '');
    const secret = ((parameters['secret'] != null) ? parameters['secret'] : ''); // The AWS secret
    const region = ((parameters['region'] != null) ? parameters['region'] : 'us-west-2');  // The default region
    const bucket = ((parameters['bucket'] != null) ? parameters['bucket'] : 'default');  // The bucket to use

    // Instantiate the required objects
    const AWS = require('aws-sdk');
    AWS.config.credentials = new AWS.Credentials({
        accessKeyId: accesskey, secretAccessKey: secret
    });
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

    /**
     * Create a Bucket
     * @param  bucketName
     */
    _controller.createBucket = async function (bucket) {
        try {
            await s3.headBucket({ 'Bucket': bucket }).promise();
        } catch (error) {
            s3.createBucket({ 'Bucket': bucket }, function (err, data) {
                if (err) {
                    console.log("Error", err);
                } else {
                    console.log("Success", data.Location);
                }
            });
        }
    }
    _controller.createBucket(bucket);

    /**
     * Create a file
     * @param {String} filePath
     * @param {object} content
     * @param {function} callback
     */
    _controller.create = function (filePath, content, callback) {
        s3.upload({ 'Bucket': bucket, 'Key': filePath, 'Body': content }, (err, data) => {
            callback(err,data);
        })
    }

    /**
     * Append to file
     * @param {String} filePath
     * @param {object} content
     * @param {function} callback
     */
    _controller.append = function (filePath, content, callback) {
        s3.getObject({ 'Bucket': bucket, 'Key': filePath }, function (err, data) {
            if (err === null) {
                s3.upload({ 'Bucket': bucket, 'Key': filePath, 'Body': data.Body.toString() + content }, (err, data) => {
                   callback(err,data);
                })
            } else {
                callback(err);
            }
        });
    }

    /**
    * Rename to file
    * @param {String} filePath
    * @param {String} newfilePath
    * @param {function} callback
    */
    _controller.rename = async function (filePath, newfilePath, callback) {
        s3.copyObject({
            'Bucket': bucket,
            'CopySource': bucket+ '/' + filePath,
            'Key': newfilePath
        })
        .promise()
        .then(() =>
            s3.deleteObject({
                'Bucket': bucket,
                'Key': filePath
            }).promise()
            .then(function(){
                callback()
            })
        )
        .catch((e) => console.error(e))
    }

    /**
     * Delete a file
     * @param {String} filePath
     * @param {function} callback
    */
    _controller.delete = function (filePath, callback) {
        s3.deleteObject({
            'Bucket': bucket,
            'Key': filePath
        }).promise()
    }

    /**
     * Create a directory
     * @param {String} directory
     * @param {function} callback
     */
    _controller.createDirectory = function (directory, callback) {
        s3.upload({ 'Bucket': bucket, 'Key': filePath }, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data.Location)
        })
    }

    /**
     * Read a File
     * @param {String} filePath
     * @param {function} callback
    */
    _controller.readFile = function (filePath, callback) {
        s3.getObject({ 'Bucket': bucket, 'Key': filePath }, function (err, data) {
            if (err === null) {
                callback(data.Body.toString())
            } else {
                res.status(500).send(err);
            }
        });
    }

    /**
     * Read a Directory
     * @param {String} directory
     * @param {function} callback
     */
    _controller.readDirectory = async function (directory, callback) {
        const data = await s3.listObjects({ 'Bucket': bucket, Delimiter: '/', Prefix: directory + '/ '}).promise();
        callback(data);
    }

    /**
     * File Exists
     * @param {String} filePath
     * @param {function} callback
    */
    _controller.exists = async function (filePath, callback) {
        try {
            await s3.headObject({ 'Bucket': bucket, 'Key': filePath }).promise();
            const signedUrl = s3.getSignedUrl('getObject', { 'Bucket': bucket, 'Key': filePath });
            callback(true);
        } catch (error) {
            console.log(error);
            if (error.name === 'NotFound') {
                callback(false);
            } else {
                callback(false, error);
            }
        }
    }

    return _controller;
};

