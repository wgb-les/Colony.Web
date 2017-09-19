using System.Collections.Generic;

namespace Colony.Web.Areas.Shop.Models
{
    public class ProductSearchColourFilterViewModel
    {
        public List<ProductSearchColourGroup> Groups
        {
            get
            {
                var groups = new List<ProductSearchColourGroup>
                {
                    new ProductSearchColourGroup
                    {
                        Name = "orange",
                        Colours = new List<ProductSearchColour>
                        {
                            new ProductSearchColour {Name = "", Code = "4228", Colour = "e87511"}
                        }
                    },
                    new ProductSearchColourGroup
                    {
                        Name = "reds",
                        Colours = new List<ProductSearchColour>
                        {
                            new ProductSearchColour {Name = "", Code = "3831", Colour = "e23d28"}
                        }
                    },
                    new ProductSearchColourGroup
                    {
                        Name = "Pink",
                        Colours = new List<ProductSearchColour>
                        {
                            new ProductSearchColour {Name = "", Code = "3692", Colour = "ed7a9e"}
                        }
                    },
                    new ProductSearchColourGroup
                    {
                        Name = "purple",
                        Colours = new List<ProductSearchColour>
                        {
                            new ProductSearchColour {Name = "", Code = "4227", Colour = "7c6992"}
                        }
                    },
                    new ProductSearchColourGroup
                    {
                        Name = "blue",
                        Colours = new List<ProductSearchColour>
                        {
                            new ProductSearchColour {Name = "", Code = "4180", Colour = "6693bc"}
                        }
                    },
                        //new ProductSearchColourGroup
                        //{
                        //    Name = "aqua",
                        //    Colours = new List<ProductSearchColour>
                        //    {
                        //        new ProductSearchColour {Name = "", Code = "C5", Colour = "7fbcaa"},
                        //        new ProductSearchColour {Name = "", Code = "B5", Colour = "aac4bf"},
                        //        new ProductSearchColour {Name = "", Code = "E5", Colour = "00848e"}
                        //    }
                        //},
                        //new ProductSearchColourGroup
                        //{
                        //    Name = "lime",
                        //    Colours = new List<ProductSearchColour>
                        //    {
                        //        new ProductSearchColour {Name = "", Code = "C6", Colour = "a3af07"},
                        //        new ProductSearchColour {Name = "", Code = "A6", Colour = "d2db9e"},
                        //        new ProductSearchColour {Name = "", Code = "B6", Colour = "d4d279"}
                        //    }
                        //},
                    new ProductSearchColourGroup
                    {
                        Name = "grass",
                        Colours = new List<ProductSearchColour>
                        {
                            new ProductSearchColour {Name = "", Code = "3814", Colour = "2e613a"}
                        }
                    },
                    new ProductSearchColourGroup
                    {
                        Name = "yellow",
                        Colours = new List<ProductSearchColour>
                        {
                            new ProductSearchColour {Name = "", Code = "3693", Colour = "daaa00"}
                        }
                    },
                    new ProductSearchColourGroup
                    {
                        Name = "grey",
                        Colours = new List<ProductSearchColour>
                        {
                            new ProductSearchColour {Name = "", Code = "3974", Colour = "b1aca3"}
                        }
                    },
                        //new ProductSearchColourGroup
                        //{
                        //    Name = "cream",
                        //    Colours = new List<ProductSearchColour>
                        //    {
                        //        new ProductSearchColour {Name = "", Code = "B8", Colour = "ebe3c7"},
                        //        new ProductSearchColour {Name = "", Code = "A8", Colour = "faf7eb"},
                        //        new ProductSearchColour {Name = "", Code = "C8", Colour = "dbceac"}
                        //    }
                        //},
                    new ProductSearchColourGroup
                    {
                        Name = "brown",
                        Colours = new List<ProductSearchColour>
                        {
                            new ProductSearchColour {Name = "", Code = "4225", Colour = "78614d"}
                        }
                    },
                    new ProductSearchColourGroup
                    {
                        Name = "black",
                        Colours = new List<ProductSearchColour>
                        {
                            new ProductSearchColour {Name = "", Code = "3633", Colour = "000000"}
                        }
                    },
                    new ProductSearchColourGroup
                    {
                        Name = "white",
                        Colours = new List<ProductSearchColour>
                        {
                            new ProductSearchColour {Name = "", Code = "3993", Colour = "f3f2f3"}
                        }
                    },
                        new ProductSearchColourGroup
                        {
                            Name = "metalic",
                            Colours = new List<ProductSearchColour>
                            {
                                new ProductSearchColour {Name = "", Code = "B9", Colour = "e0dfd8"}
                            }
                        }
                };

                return groups;
            }
        }
    }

    public class ProductSearchColourGroup
    {
        public string Name { get; set; }

        public List<ProductSearchColour> Colours { get; set; }
    }


    public class ProductSearchColour
    {
        public string Name { get; set; }

        public string Code { get; set; }

        public string Colour { get; set; }
    }
}