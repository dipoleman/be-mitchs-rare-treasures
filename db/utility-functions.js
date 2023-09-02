exports.extractShopNameAndId = (arr) => {
  const shops = arr.reduce((acc, shop) => {
    acc[shop.shop_name] = shop.shop_id;
    return acc;
  }, {});

  return shops;
};


