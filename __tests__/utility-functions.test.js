const { extractShopNameAndId } = require("../db/utility-functions");

const input = [
    {
      shop_id: 1,
      shop_name: 'Dibbert Inc',
      owner: 'Aaliyah',
      slogan: 'Implemented motivating customer loyalty'
    },
    {
      shop_id: 2,
      shop_name: 'Feeney Inc',
      owner: 'Elta',
      slogan: 'Function-based intermediate secured line'
    }]

describe("extract shop Id and shop name from returned DB",()=>{
    it('should output an object',()=>{
        const output = extractShopNameAndId([])
        expect(typeof output).toBe('object')
    })
    it('should return an empty object if passed an empty array',()=>{
        const output = extractShopNameAndId([])
        expect(output).toEqual({})
    })
    it('should return [{shop_name:shop_id}...]',()=>{
        const output = extractShopNameAndId(input)
        const expected ={'Dibbert Inc':1,'Feeney Inc':2}
        expect(output).toEqual(expected)
    })
    it('should not mutate the input',()=>{
        extractShopNameAndId(input)
        const expected =[
            {
              shop_id: 1,
              shop_name: 'Dibbert Inc',
              owner: 'Aaliyah',
              slogan: 'Implemented motivating customer loyalty'
            },
            {
              shop_id: 2,
              shop_name: 'Feeney Inc',
              owner: 'Elta',
              slogan: 'Function-based intermediate secured line'
            }]
        expect(input).toEqual(expected)
    })
})
