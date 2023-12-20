// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract RealEstateProperty {
    constructor() {
        contractOwner = msg.sender;
    }

    address public contractOwner;
    uint256 public propertyIndex;
    uint256 public commissionRate = 5; // 5% commission rate
    uint256 public contractBalance = 0;
    mapping(address => uint256) public usersPendingWithdrawals;
    mapping(uint256 => Property) private properties;

    modifier onlyOwner() {
        require(
            msg.sender == contractOwner,
            "Only the contract owner can perform this action"
        );
        _;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid new owner address");
        contractOwner = newOwner;
    }

    struct Property {
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
        address indexed owner
    );

    event PropertyUnlisted(
        uint256 indexed productId,
        string productTitle,
        address indexed owner
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
        string comment;
        uint256 rating;
        uint256 timestamp;
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
    mapping(uint256 => Review[]) private reviews;
    mapping(uint256 => Product) private products;
    mapping(address => uint256[]) private userReviews;

    uint256 public reviewsCount;

    event ReviewCreated(
        uint256 indexed productId,
        address indexed reviewer,
        string review,
        uint256 rating,
        uint256 timestamp
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

    event Withdrawal(address indexed user, uint256 amount);

    function creacteProperty(
        string memory _productTitle,
        uint256 price,
        string memory _category,
        string memory _location,
        string memory _description,
        string memory _imageUrl
    ) external returns (uint256) {
        require(price > 0, "Price must be greater than 0");
        address owner = msg.sender;
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

        emit PropertyCreated(
            productId,
            _productTitle,
            owner,
            price,
            _category,
            _location,
            _description,
            _imageUrl
        );
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

    function updatePropertyPrice(uint256 productId, uint256 newPrice)
        external
        returns (string memory)
    {
        Property storage property = properties[productId];
        require(newPrice > 0, "Price must be greater than 0");
        require(property.onSale == true, "Property is not on sale");
        require(
            property.owner == msg.sender,
            "You are not the owner of this property"
        );
        properties[productId].price = newPrice;

        return "Property price updated";
    }

    function updateProprtyDetailes(
        uint256 productId,
        string memory _category,
        string memory _location,
        string memory _description,
        string memory _imageUrl
    ) external returns (uint256) {
        Property storage property = properties[productId];
        require(
            property.owner == msg.sender,
            "You are not the owner of this property"
        );
        property.category = _category;
        property.location = _location;
        property.description = _description;
        property.imageUrl = _imageUrl;

        return productId;
    }

    function buyProperty(uint256 productId) external payable {
        Property storage property = properties[productId];
        require(
            property.owner != msg.sender,
            "You cannot buy your own property"
        );
        require(property.onSale == true, "Property is not on sale");
        require(msg.value >= property.price, "Insufficient balance");

        uint256 commissionAmount = (property.price * commissionRate) / 100;
        uint256 sellerAmount = property.price - commissionAmount;

        usersPendingWithdrawals[msg.sender] += sellerAmount;
        contractBalance += commissionAmount;

        property.onSale = false;
        property.owner = msg.sender;
        emit PropertySold(
            productId,
            property.productTitle,
            property.owner,
            msg.sender,
            property.price,
            property.category,
            property.location,
            property.description,
            property.imageUrl
        );
    }

    function withdrawSellerFunds() external {
        uint256 amount = usersPendingWithdrawals[msg.sender];
        require(amount > 0, "Nothing to withdraw");

        usersPendingWithdrawals[msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit Withdrawal(msg.sender, amount);
    }

    function withdrawContractOwnerFunds() external onlyOwner {
        require(contractBalance > 0, "Nothing to withdraw");

        uint256 amountToWithdraw = contractBalance;
        contractBalance = 0;

        payable(contractOwner).transfer(amountToWithdraw);

        emit Withdrawal(contractOwner, amountToWithdraw);
    }

    function getPropertiesOnSale() external view returns (Property[] memory) {
        uint256 length = propertyIndex;
        uint256 currentIdex = 0;
        Property[] memory propertyArray = new Property[](length);
        for (uint256 i = 0; i < length; i++) {
            Property storage property = properties[i];
            if (property.onSale == true) {
                propertyArray[currentIdex] = property;
                currentIdex++;
            }
        }
        return propertyArray;
    }

    function getAllProperties() external view returns (Property[] memory) {
        uint256 length = propertyIndex;
        Property[] memory propertyArray = new Property[](length);

        for (uint256 i = 0; i < length; i++) {
            uint256 currentId = i + 1;
            Property storage property = properties[currentId];
            propertyArray[i] = property;
        }

        return propertyArray;
    }

    function getProperty(uint256 productId)
        external
        view
        returns (
            uint256,
            address,
            string memory,
            uint256,
            bool,
            string memory,
            string memory,
            string memory
        )
    {
        Property storage property = properties[productId];
        return (
            property.productId,
            property.owner,
            property.productTitle,
            property.price,
            property.onSale,
            property.category,
            property.description,
            property.imageUrl
        );
    }

    function getUserProperties(address user)
        external
        view
        returns (Property[] memory)
    {
        uint256 propertyCount = 0;

        // Loop through all possible product IDs
        for (uint256 i = 1; i <= propertyIndex; i++) {
            if (properties[i].owner == user) {
                propertyCount++;
            }
        }

        Property[] memory propertyArray = new Property[](propertyCount);
        uint256 currentIdex = 0;

        // Loop again to fetch properties owned by the user
        for (uint256 i = 1; i <= propertyIndex; i++) {
            if (properties[i].owner == user) {
                Property storage property = properties[i];
                propertyArray[currentIdex] = property;
                currentIdex++;
            }
        }

        return propertyArray;
    }

    //REVIEW FUNCTIONS

    function createReview(
        uint256 productId,
        uint256 rating,
        string calldata comment
    ) external {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
        uint256 timestamp = block.timestamp;
        address user = msg.sender;

        Property storage property = properties[productId];

        property.reviewers.push(user);
        property.review.push(comment);
        property.rating.push(rating);

        // Add review to reviews mapping
        reviews[productId].push(Review(user, comment, rating, timestamp, 0, 0));

        // Push productId to userReviews mapping
        userReviews[user].push(productId);

        // Update product review details
        products[productId].totalReviews += 1; // Increment total reviews count
        products[productId].totalRating += rating; // Add to total rating

        emit ReviewCreated(productId, user, comment, rating, timestamp);

        reviewsCount++;
    }

    function getProductReviews(uint256 productId)
        external
        view
        returns (Review[] memory)
    {
        return reviews[productId];
    }

    function getUserReviews(address user)
        external
        view
        returns (Review[] memory)
    {
        // Get the length of the user's reviews list
        uint256 length = userReviews[user].length;

        // Initialize an array to store the user's reviews
        Review[] memory reviewArray = new Review[](length);

        // Loop through each review associated with the user
        for (uint256 i = 0; i < length; i++) {
            // Fetch the current product ID associated with the review
            uint256 productId = userReviews[user][i];

            // Fetch all reviews associated with this product ID
            Review[] memory userReview = reviews[productId];

            // Loop through each review in the product's review list
            for (uint256 j = 0; j < userReview.length; j++) {
                // Check if the review was authored by the user
                if (userReview[j].reviewer == user) {
                    // Assign the user's review to the review array
                    reviewArray[i] = userReview[j];
                }
            }
        }
        return reviewArray;
    }

    function getHighestRatedProduct() external view returns (uint256) {
        uint256 highestRatedProductId = 0;
        uint256 highestRating = 0;

        for (uint256 i = 0; i <= reviewsCount; i++) {
            uint256 productId = i + 1;
            if (products[productId].totalReviews > 0) {
                uint256 rating = products[productId].totalRating /
                    products[productId].totalReviews;
                if (rating > highestRating) {
                    highestRating = rating;
                    highestRatedProductId = productId;
                }
            }
        }
        return highestRatedProductId;
    }
}
