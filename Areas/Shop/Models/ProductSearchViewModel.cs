using System.Collections.Generic;
using System.Linq;
using Colony.CMS;
using Colony.Commerce.Areas.Shops.Models;
using Colony.Commerce.Models.ProductCatalogue;
using Colony.Commerce.Models.Stock;

namespace Colony.Web.Areas.Shop.Models
{
    public class ProductSearchViewModel : SearchProductsBaseViewModel
    {
        public ProductSearchViewModel()
        {
            SelectedColours = new List<string>();
            SelectedBrands = new List<string>();
            SelectedProductGroups = new List<string>();
            SelectedRooms = new List<string>();
            //todo: I initialied this to be an empty list to solve the null issue in the view
            SelectedPatterns = new  List<string>();
            Brand = new List<string>();
            SelectedTrimmingTypes = new List<string>();
            SelectedUsage = new List<string>();
            ColourFilter = new ProductSearchColourFilterViewModel();

            IsBrandFilterVisible = true;
            ProductSearchResults = Enumerable.Empty<ProductSearchResult>();
        }

        public bool IsAjax { get; set; }
        public bool IsB2B { get; set; }

        public IEnumerable<ProductSearchResult> ProductSearchResults { get; set; }
        public string AnswerHandle { get; set; }
        public string SearchHandle { get; set; }
        public string SearchTerms { get; set; }
        public int LastPage { get; set; }
        public string CelebrosCustomMessage { get; set; }

        public string CelebrosLogHandle { get; set; }
        public string CelebrosSearchSessionId { get; set; }
        public long TotalResultCount { get; set; }

        #region Filters

        // Celebros Filters

        public List<CelebrosAttributeOption> Patterns
        {
            get
            {
                if (CelebrosOptions == null) return null;
                return CelebrosOptions.FindAll(x => x.SkuAttribute.Name == "Pattern").OrderBy(t => t.Order).ToList();
            }
        }

        public List<CelebrosAttributeOption> Brands
        {
            get
            {
                if (IsB2B)
                {
                    return CelebrosOptions.FindAll(x => x.SkuAttribute.Name == "Brand").OrderBy(t => t.Order).ToList();
                }
                else
                {
                    var brands = CelebrosOptions.FindAll(x => x.SkuAttribute.Name == "Brand").OrderBy(t => t.Order).ToList();
                    brands.RemoveAll(t => t.Name == "Style Library");
                    return brands;
                }
//                return CelebrosOptions.FindAll(x => x.SkuAttribute.Name == "Brand").OrderBy(t => t.Order).ToList(); 
            }
        }

        public List<CelebrosAttributeOption> Usage
        {
            get
            {
                if (CelebrosOptions == null) return null;
                return CelebrosOptions.FindAll(x => x.SkuAttribute.Name == "Usage").OrderBy(t => t.Order).ToList();
            }
        }

        public List<CelebrosAttributeOption> EndUse
        {
            get
            {
                if (CelebrosOptions == null) return null;
                return CelebrosOptions.FindAll(x => x.SkuAttribute.Name == "End Use").OrderBy(t => t.Order).ToList();
            }
        }

        public List<CelebrosAttributeOption> Type
        {
            get
            {
                if (CelebrosOptions == null) return null;
                return CelebrosOptions.FindAll(x => x.SkuAttribute.Name == "Type").OrderBy(t => t.Order).ToList();
            }
        }

        public List<CelebrosAttributeOption> WallpaperTypes
        {
            get
            {
                if (CelebrosOptions == null) return null;
                return CelebrosOptions.FindAll(x => x.SkuAttribute.Name == "Wallpaper Type").OrderBy(t => t.Order).ToList();
            }
        }

        public List<CelebrosAttributeOption> Composition
        {
            get
            {
                if (CelebrosOptions == null) return null;
                return CelebrosOptions.FindAll(x => x.SkuAttribute.Name == "Composition").OrderBy(t => t.Order).ToList();
            }
        }

        public List<CelebrosAttributeOption> FRTreated
        {
            get
            {
                if (CelebrosOptions == null) return null;
                return CelebrosOptions.FindAll(x => x.SkuAttribute.Name == "FR Treated").OrderBy(t => t.Order).ToList();
            }
        }

        public List<CelebrosAttributeOption> FRTreatable
        {
            get
            {
                if (CelebrosOptions == null) return null;
                return CelebrosOptions.FindAll(x => x.SkuAttribute.Name == "FR Treatable").OrderBy(t => t.Order).ToList();
            }
        }

        public List<CelebrosAttributeOption> FRInherent
        {
            get
            {
                if (CelebrosOptions == null) return null;
                return CelebrosOptions.FindAll(x => x.SkuAttribute.Name == "FR Inherent").OrderBy(t => t.Order).ToList();
            }
        }

        public List<CelebrosAttributeOption> ProductGroup
        {
            get
            {
                var siteKey = ColonyContext.Current.CurrentSite.SiteKey.ToLowerInvariant();

                var groups = CelebrosOptions
                    .FindAll(x => x.SkuAttribute.Name == "Category")
                    .OrderBy(t => t.Order)
                    .ToList();

                //Remove Categories - based on category
                groups.RemoveAll(t => t.Name == "Adhesives");

                //Remove Categories - based on site
                switch (siteKey.ToLower()) {
                    case "wg":
                        if (IsB2B) {
                            groups.RemoveAll(t => t.Name == "Bedding");
                            groups.RemoveAll(t => t.Name == "Bathroom");
                        }
                        break;
                    case "contracts":
                        groups.RemoveAll(t => t.Name == "Bedding");
                        groups.RemoveAll(t => t.Name == "Style Library");
                        groups.RemoveAll(t => t.Name == "Cushions");
                        groups.RemoveAll(t => t.Name == "Bathroom");
                        groups.RemoveAll(t => t.Name == "Furniture");
                        groups.RemoveAll(t => t.Name == "Rugs");
                        break;
                    default:                            
                        break;
                }
                
                //Change Labels
                foreach (var prodGroup in groups)
                {
                    if (prodGroup.Name == "Bedding")
                    {
                        prodGroup.Name = "Bedding & Accessories";
                        continue;
                    }

                    if (prodGroup.Name == "Bathroom")
                    {
                        prodGroup.Name = "Bathroom Accessories";
                    }
                }

                return groups;
            }
        }

        public List<CelebrosAttributeOption> TrimmingTypes
        {
            get
            {
                if (CelebrosOptions == null) return null;
                return CelebrosOptions.FindAll(x => x.SkuAttribute.Name == "Trimming Type").OrderBy(t => t.Order).ToList();
            }
        }

        public List<CelebrosAttributeOption> FabricTypes
        {
            get
            {
                if (CelebrosOptions == null) return null;
                return CelebrosOptions.FindAll(x => x.SkuAttribute.Name == "Fabric Type").OrderBy(t => t.Order).ToList();
            }
        }

        public List<CelebrosAttributeOption> ContractUsage
        {
            get
            {
                if (CelebrosOptions == null) return null;
                return CelebrosOptions.FindAll(x => x.SkuAttribute.Name == "Contract Usage").OrderBy(t => t.Order).ToList();
            }
        }

        public List<CelebrosAttributeOption> Rooms
        {
            get
            {
                 var siteKey = ColonyContext.Current.CurrentSite.SiteKey.ToLowerInvariant();
                if ((CelebrosOptions == null) || (siteKey.ToLower() == "contracts"))
                {
                    var emptyList = new List<CelebrosAttributeOption>();
                    return emptyList;
                }
                return CelebrosOptions.FindAll(x => x.SkuAttribute.Name == "Room").OrderBy(t => t.Order).ToList();
            }
        }

        public List<CelebrosAttributeOption> Colours
        {
            get
            {
                if (CelebrosOptions == null) return null;
                return CelebrosOptions.FindAll(x => x.SkuAttribute.Name == "Colour").OrderBy(t => t.Name).ToList();
            }
        }

        // End Celebros Filters


        public List<string> ProductCategory { get; set; }


        public List<SkuAttributeOption> FlameRetardant
        {
            get
            {
                return Options.FindAll(x => x.SkuAttribute.Name == "Flame Retardant").OrderBy(t => t.Order).ToList();
            }
        }


        public List<SkuAttributeOption> SmallScale
        {
            get { return Options.FindAll(x => x.SkuAttribute.Name == "Small Scale").OrderBy(t => t.Order).ToList(); }
        }

        public List<SkuAttributeOption> DimOut
        {
            get { return Options.FindAll(x => x.SkuAttribute.Name == "Dim Out").OrderBy(t => t.Order).ToList(); }
        }

        //public List<SkuAttributeOption> colBrands
        //{
        //    get { return Options.FindAll(x => x.SkuAttribute.Name == "Brand").OrderBy(t => t.Order).ToList(); }
        //}


        //public List<SkuAttributeOption> colUsage
        //{
        //    get { return Options.FindAll(x => x.SkuAttribute.Name == "Usage").OrderBy(t => t.Order).ToList(); }
        //}

        //public List<SkuAttributeOption> colComposition
        //{
        //    get { return Options.FindAll(x => x.SkuAttribute.Name == "Composition").OrderBy(t => t.Order).ToList(); }
        //}

        //public List<SkuAttributeOption> colFRTreated
        //{
        //    get { return Options.FindAll(x => x.SkuAttribute.Name == "FR Treated").OrderBy(t => t.Order).ToList(); }
        //}

        //public List<SkuAttributeOption> colFRTreatable
        //{
        //    get { return Options.FindAll(x => x.SkuAttribute.Name == "FR Treatable").OrderBy(t => t.Order).ToList(); }
        //}

        //public List<SkuAttributeOption> colFRInherent
        //{
        //    get { return Options.FindAll(x => x.SkuAttribute.Name == "FR Inherent").OrderBy(t => t.Order).ToList(); }
        //}

        //public List<SkuAttributeOption> colWallpaperTypes
        //{
        //    get { return Options.FindAll(x => x.SkuAttribute.Name == "Wallpaper Type").OrderBy(t => t.Order).ToList(); }
        //}

        //public List<SkuAttributeOption> colTrimmingTypes
        //{
        //    get { return Options.FindAll(x => x.SkuAttribute.Name == "Trimming Type").OrderBy(t => t.Order).ToList(); }
        //}

        //public List<SkuAttributeOption> colFabricTypes
        //{
        //    get { return Options.FindAll(x => x.SkuAttribute.Name == "Fabric Type").OrderBy(t => t.Order).ToList(); }
        //}

        public List<SkuAttributeOption> UpholsteryClothDesignation
        {
            get
            {
                return
                    Options.FindAll(x => x.SkuAttribute.Name == "Upholstery Cloth Designation")
                        .OrderBy(t => t.Order)
                        .ToList();
            }
        }

        public List<SkuAttributeOption> FabricCareInstructions
        {
            get {
                return
                    Options.FindAll(x => x.SkuAttribute.Name == "Fabric Care/Washing Instructions")
                        .OrderBy(t => t.Order)
                        .ToList();
            }
        }

        public List<SkuAttributeOption> WallpaperCareInstructions
        {
            get {
                return
                    Options.FindAll(x => x.SkuAttribute.Name == "Wallpaper Care/Washing Instructions")
                        .OrderBy(t => t.Order)
                        .ToList();
            }
        }

        public IDictionary<string, long> AttributeOptionCounts { get; set; }

        public List<string> Brand { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public int? Martindale { get; set; }
        public ProductSearchColourFilterViewModel ColourFilter { get; set; }
        public string SortBy { get; set; }

        #endregion

        #region Filter Visibility

        public bool IsPatternsFilterVisible { get; set; }
        public bool IsProductCategoryFilterVisible { get; set; }
        public bool IsEndUseFilterVisible { get; set; }
        public bool IsTypeFilterVisible { get; set; }
        public bool IsFlameRetardantFilterVisible { get; set; }
        public bool IsProductGroupFilterVisible { get; set; }
        public bool IsSmallScaleFilterVisible { get; set; }
        public bool IsBrandFilterVisible { get; set; }
        public bool IsDimOutFilterVisible { get; set; }
        public bool IsPriceFilterVisible { get; set; }
        public bool IsMartindaleFilterVisible { get; set; }
        public bool IsUsageFilterVisible { get; set; }
        public bool IsContractUsageFilterVisible { get; set; }
        public bool IsCompositionFilterVisible { get; set; }
        public bool IsFRInherentVisible { get; set; }
        public bool IsFRTreatableVisible { get; set; }
        public bool isFRTreatedVisible { get; set; }
        public bool NoResults { get; set; }
        public bool IsWallpaperTypesVisible { get; set; }
        public bool IsTrimmingTypesVisible { get; set; }
        public bool IsFabricTypesVisible { get; set; }
        public bool IsUpholsteryClothDesignationVisible { get; set; }
        public bool IsWallpaperCareInstructionsVisible { get; set; }
        public bool IsFabricCareInstructionsVisible { get; set; }

        #endregion

        #region Selected Filter Collections

        public List<string> SelectedBrands { get; set; }
        public List<string> SelectedPatterns { get; set; }
        public List<string> SelectedProductGroups { get; set; }
        public List<string> SelectedSmallScales { get; set; }
        public List<string> SelectedDimOuts { get; set; }
        public List<string> SelectedEndUses { get; set; }
        public List<string> SelectedType { get; set; }
        public List<string> SelectedFlameRetardant { get; set; }
        public List<string> SelectedColours { get; set; }
        public List<string> SelectedUsage { get; set; }
        public List<string> SelectedContractUsage { get; set; }
        public List<string> SelectedComposition { get; set; }
        public List<string> SelectedFRTreatable { get; set; }
        public List<string> SelectedFRTreated { get; set; }
        public List<string> SelectedFRInherent { get; set; }
        public List<string> SelectedWallpaperTypes { get; set; }
        public List<string> SelectedTrimmingTypes { get; set; }
        public List<string> SelectedFabricTypes { get; set; }
        public List<string> SelectedUpholsteryClothDesignation { get; set; }
        public List<string> SelectedWallpaperCareInstructions { get; set; }
        public List<string> SelectedFabricCareInstructions { get; set; }
        public List<string> SelectedRooms { get; set; } 

        #endregion
    }
}