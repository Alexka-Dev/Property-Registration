const { expect } = require("chai");

describe("PropertyRegistration", function () {
  let PropertyRegistration;
  let propertyRegistration;
  let owner;
  let addr1;

  beforeEach(async function () {
    PropertyRegistration = await ethers.getContractFactory(
      "propertyRegistration"
    );
    [owner, addr1] = await ethers.getSigners();
    propertyRegistration = await PropertyRegistration.deploy();
  });

  it("should register a new property", async function () {
    const description = "A beautiful house";
    await propertyRegistration.registerProperty(description);

    const property = await propertyRegistration.properties(0);
    expect(property.id).to.equal(0);
    expect(property.description).to.equal(description);
    expect(property.owner).to.equal(owner.address);

    expect(await propertyRegistration.propertyCount()).to.equal(1);
  });

  it("should transfer a property", async function () {
    const description = "A beautiful house";
    await propertyRegistration.registerProperty(description);

    await propertyRegistration.transferProperty(0, addr1.address);

    const property = await propertyRegistration.properties(0);
    expect(property.owner).to.equal(addr1.address);
  });

  it("should get property details", async function () {
    const description = "A beautiful house";
    await propertyRegistration.registerProperty(description);

    const property = await propertyRegistration.getProperty(0);
    expect(property[0]).to.equal(0);
    expect(property[1]).to.equal(description);
    expect(property[2]).to.equal(owner.address);
  });

  it("should not allow non-owners to transfer property", async function () {
    const description = "A beautiful house";
    await propertyRegistration.registerProperty(description);

    await expect(
      propertyRegistration.connect(addr1).transferProperty(0, addr1.address)
    ).to.be.revertedWith("Only the owner can transfer this property");
  });

  it("should revert if the property ID is invalid", async function () {
    await expect(
      propertyRegistration.transferProperty(1, addr1.address)
    ).to.be.revertedWith("Invalid property ID.");
    await expect(propertyRegistration.getProperty(1)).to.be.revertedWith(
      "Invalid property ID."
    );
  });
});
