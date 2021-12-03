pragma solidity ^0.5.0;

contract Cert {
    string public name = 'Cert';

    uint public fileCount = 0;

    mapping(uint => File) public files;

    // Struct
    struct File {
        uint fileId;
        string fileHash;
        uint fileSize;
        string fileType;
        string fileName;
        string fileDescription;
        uint uploadTime;
        address payable uploader;
    }

    // Event
    event FileUploaded(
        uint fileId,
        string fileHash,
        uint fileSize,
        string fileType,
        string fileName,
        string fileDescription,
        uint uploadTime,
        address payable uploader
    );

    constructor() public {
  }
    function uploadFile(string memory _fileHash, uint _fileSize, string memory _fileType, string memory _fileName, string memory _fileDescription) public {

    // file hash exists
    require(bytes(_fileHash).length > 0);

    // file type exists
    require(bytes(_fileType).length > 0);

    // file description exists
    require(bytes(_fileDescription).length > 0);

    // file name exists
    require(bytes(_fileName).length > 0);

    // file uploader address exists
    require(msg.sender!=address(0));

    // file size is more then 0
    require(_fileSize>0);


    fileCount ++;

    // Add File 
   files[fileCount] = File(fileCount, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, now, msg.sender);

    // Trigger 
    emit FileUploaded(fileCount, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, now, msg.sender);
    }
}

