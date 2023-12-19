// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract RealEstateProperty {
    struct Property{
        uint256 productId;
        string productTitle;
        address owner;
        uint256 price;
        string category;
        string location;
        string description;
        string imageUrl;
        address[] listOfBuyers;
        address[] reviewers;
        string[] review;
        uint256[] rating;
        bool onSale;
    }

    mapping(uint256 => Property) private properties;
    uint public propertyIndex;

    // EVENTS
    event PropertyCreated(
        uint256 indexed productId,
        string productTitle,
        address indexed owner,
        uint256 price,
        string category,
        string location,
        string description,
        string imageUrl
    );

    event PropertyListed(
        uint256 indexed productId,
        string productTitle,
        address indexed owner,
    );

    event PropertyUnlisted(
        uint256 indexed productId,
        string productTitle,
        address indexed owner,
    );

    event PropertySold(
        uint256 indexed productId,
        string productTitle,
        address indexed oldOwner,
        address indexed newOwner,
        uint256 price,
        string category,
        string location,
        string description,
        string imageUrl
    );

    event PropertyResold(
        uint256 indexed productId,
        string productTitle,
        address indexed oldOwner, 
        address indexed newOwner,
        uint256 price,
        string category,
        string location,
        string description,
        string imageUrl
    );


    // Review
    struct Review {
        address reviewer;
        string review;
        uint256 rating;
        string timestamp;
        string comment;
        uint256 likes;
        uint256 dislikes; 
    }
     
     struct Product {
        uint256 productId;
        uint256 totalRating;
        uint256 totalReviews;
        uint256 totalLikes;
        uint256 totalDislikes;
     }

    //MAPPINGS
    mapping(uint256 => Review) private reviews;
    mapping(uint256 => Product) private products;
    mapping(address => uint256) private userReviews;

    uint256 public reviewsCount;

    event ReviewCreated(
        uint256 indexed productId,
        address indexed reviewer,
        string review,
        uint256 rating,
        string timestamp,
        string comment
    );

    event ReviewLiked(
        uint256 indexed productId,
        uint256 indexed revieverIndex,
        address indexed liker,
        uint256 likes
    );

    event ReviewDisliked(
        uint256 indexed productId,
        uint256 indexed revieverIndex,
        address indexed disliker,
        uint256 dislikes
    );

    // FUNCTIONS

    function creacteProperty(
        string memory _productTitle,
        address owner,
        uint256 price,
        string memory _category,
        string memory _location,
        string memory _description,
        string memory _imageUrl
    ) external returns(uint256) {
        require(price > 0, "Price must be greater than 0");
        uint256 productId = propertyIndex++;

        Property storage property = properties[productId];
        property.productId = productId;
        property.productTitle = _productTitle;
        property.owner = owner;
        property.price = price;
        property.category = _category;
        property.location = _location;
        property.description = _description;
        property.imageUrl = _imageUrl;

        emit PropertyCreated(productId, _productTitle, owner, price, _category, _location, _description, _imageUrl);
        return productId;

    }

    function listProperty(uint256 productId) external {
        Property storage property = properties[productId];
        property.onSale = true;
        emit PropertyListed(productId, property.productTitle, property.owner);
    }

    function unlistProperty(uint256 productId) external {
        Property storage property = properties[productId];
        property.onSale = false;
        emit PropertyUnlisted(productId, property.productTitle, property.owner);
    }

    function updatePropertyPrice(uint256 productId, uint256 newPrice) external {
        Property storage property = properties[productId];
        require(newPrice > 0, "Price must be greater than 0");
        require(property.onSale == true, "Property is not on sale");
        require(conditions: property.owner == msg.sender, "You are not the owner of this property");
        properties[productId].price = newPrice;

    }

    function updateProprtyDetailes (uint256 productId, string memory _category, string memory _location, string memory _description, string memory _imageUrl) external returns(uint256) {
        Property storage property = properties[productId];
        require(conditions: property.owner == msg.sender, "You are not the owner of this property");
        property.category = _category;
        property.location = _location;
        property.description = _description;
        property.imageUrl = _imageUrl;

        return productId;
    }
    





}