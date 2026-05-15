const ContactMe = require('../model/contact.model');
const User = require('../../user/model/user.model');

module.exports.createContact = async data => {
    const dataArray = Array.isArray(data) ? data : [data];
    
    // get names from the array
    const dataNames = [...new Set(dataArray.map(each => each.contact_name))];

    // get already input data
    const existingData = await ContactMe.find({
        contact_name: {$in: dataNames},
    });

    const existingNames = existingData.map(each => each.contact_name);

    // check if data is already present
    const filteredData = dataArray.filter(each => 
        !existingNames.includes(each.contact_name)
    );
    
    const formattedData = filteredData.map(each => ({
        ...each,
        contact_name: each.contact_name.trim()
    }));

    const createData = await ContactMe.create(formattedData);

    const dataIds = createData.map(each => each._id);

    await User.updateMany(
        {},
        {$push: {contact_me: {$each: dataIds}}},
    );

    return createData;
};

module.exports.updateContact = async (id, data) => {
    if (!id) throw new Error("Invalid Id: ", id);
    if (!data) throw new Error("Invalid Data Received");
    
    const existingData = await ContactMe.find();
    const existingIds = existingData.map(each => each._id.toString());
    
    if (!existingIds.includes(id)) {
        throw new Error(`Invalid ID: ${id} Found`);
    };

    const updateData = await ContactMe.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true,
        },
    );

    if (!updateData) throw new Error("No Data Updated");

    return updateData;
};

module.exports.deleteContact = async id => {
    if (!id) throw new Error("Invalid Id Found: ", id);

    const existingData = await ContactMe.find();
    const existingIds = existingData.map(each => each._id.toString());
    
    if (!existingIds.includes(id)) {
        throw new Error(`Invalid ID: ${id} Found`);
    };

    await ContactMe.findByIdAndDelete(id);

    await User.updateOne(
        {},
        {$pull: {contact_me: id}},
    )

    return `Data with ID: ${id}, deleted successfully`;
};