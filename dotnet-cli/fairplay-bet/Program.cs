using System.Collections;
using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System;
using System.IO;
namespace MyApp
{
    class Program
    {
        static void Main(string[] args)
        {
            string serverSeed = "a";
            string serverSeedHash = "01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b";
            SHA256 sha256 = new SHA256Managed();
            Func<string, byte[]> strtobytes = s => Enumerable
                .Range(0, s.Length / 2)
                .Select(x => byte.Parse(s.Substring(x * 2, 2), NumberStyles.HexNumber))
                .ToArray();
            byte[] serverhashBytes = strtobytes(serverSeed);
            serverhashBytes = sha256.ComputeHash(serverhashBytes);
            // Chuyển mảng byte thành chuỗi hex
            string serverhashHex = BitConverter.ToString(serverhashBytes).Replace("-", "").ToLower();
            Console.WriteLine("ComputeHash: " + serverhashHex);
            PrintByteArray(serverhashBytes);
            int clienSeed = 123456;
            int betNumber = 111;
            long betResult = 1L;
            bool fairBet = BetVerifier.VerifyBetResult(serverSeed, clienSeed, betNumber, betResult, null);
            Console.WriteLine("Hello from MyClass!" + fairBet);

            long result = BetVerifier.CalculateBetResult(serverSeed, serverSeedHash , clienSeed);
            Console.WriteLine("Result:" + result);

        }

        // Display the byte array in a readable format.
        public static void PrintByteArray(byte[] array)
        {
            for(int i = 0; i < array.Length; i++)
            {
                Console.Write($"{array[i]:X2}");
                //if((i % 4) == 3)
                    //Console.Write("");
            }
            Console.WriteLine();
        }
    }
}


