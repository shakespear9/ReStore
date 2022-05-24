using System;
using API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope(); //สร้าง scope เพื่อเข้าถึง Services
            var context = scope.ServiceProvider.GetRequiredService<StoreContext>(); // Get Context Service
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>(); // Get Logger Service
            try
            {
                context.Database.Migrate();  /// ให้ execute migration ที่ยังไม่ได้ update ด้วยคำสั่ง dotnet ef database update
                DbInitializer.Initialize(context); /// seeding data
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Problem migrating data");
            }
            host.Run();

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
