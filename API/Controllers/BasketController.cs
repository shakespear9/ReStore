
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API.Controllers;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class BasketController : BaseApiController
{
    private readonly StoreContext _context;
    private string BASKET_COOKIE = "buyerId";

    public BasketController(StoreContext context)
    {
        _context = context;
    }

    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDTO>> GetBasket()
    {
        var basket = await RetrieveBasket();

        if (basket is null) return NotFound();
        return MapBasketToDTO(basket);
    }

    [HttpPost] // query string api/basket?productId=2&quantity=5
    public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
    {
        var basket = await RetrieveBasket();

        if (basket is null) basket = CreateBasket();

        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == productId);

        if (product is null) return BadRequest(new ProblemDetails { Title = "Product Not Found" });

        basket.AddItem(product, quantity);

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return CreatedAtRoute(nameof(GetBasket), MapBasketToDTO(basket));

        return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        var basket = await RetrieveBasket();
        if (basket is null) return NotFound();
        basket.RemoveItem(productId, quantity);

        var result = await _context.SaveChangesAsync() > 0;
        if (result) return Ok();

        return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" });

    }

    private async Task<Basket> RetrieveBasket()
    {
        return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies[BASKET_COOKIE]);
    }

    private Basket CreateBasket()
    {
        var buyerId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
        Response.Cookies.Append(BASKET_COOKIE, buyerId, cookieOptions);
        var basket = new Basket { BuyerId = buyerId };
        _context.Baskets.Add(basket);
        return basket;
    }

    private static BasketDTO MapBasketToDTO(Basket basket)
    {
        return new BasketDTO
        {
            Id = basket.Id,
            BuyerId = basket.BuyerId,
            Items = basket.Items.Select(item => new BasketItemDTO
            {
                ProductId = item.ProductId,
                Name = item.Product.Name,
                Price = item.Product.Price,
                PictureUrl = item.Product.PictureUrl,
                Type = item.Product.Type,
                Brand = item.Product.Brand,
                Quantity = item.Quantity
            }).ToList()
        };
    }


}