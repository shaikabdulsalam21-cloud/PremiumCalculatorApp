namespace PremiumApplication.Server
{
    public class PremiumRequest
    {
        public string name { get; set; } = string.Empty;
        public int AgeNextBirthday { get; set; }
        public string DateOfBirth { get; set; } = string.Empty;
        public string Occupation { get; set; } = string.Empty;
        public decimal DeathSumInsured { get; set; }
    }
}
