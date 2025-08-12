export enum PropertyType {
    APARTMENT = "apartment",
    HOUSE = "house",
    VILLA = "villa",
    CABIN = "cabin",
    HOUSE_BOAT = "houseBoat"
}

export const propertyTypes = [
    { label: "Wohnung", value: PropertyType.APARTMENT },
    { label: "Haus", value: PropertyType.HOUSE },
    { label: "Villa", value: PropertyType.VILLA },
    { label: "Hütte", value: PropertyType.CABIN },
    { label: "Hausboot", value: PropertyType.HOUSE_BOAT },
];

export interface PropertyData {
    name: string;
    address: string;
    image: string | undefined;
    placeholderImage: string | undefined;
    description: string;
    type: PropertyType;
    additionalInfos: AdditionalInfoType[]
    numBeds: number;
    numBathrooms: number;
    area: number;
    pricePerNight: number;
    available: boolean;
}

export const countryOptions = [
    { label: "Costa Rica", value: "Costa Rica" },
    { label: "Deutschland", value: "Deutschland" },
    { label: "Italien", value: "Italien" },
    { label: "Niederlande", value: "Niederlande" },
    { label: "Österreich", value: "Österreich" },
    { label: "Schweiz", value: "Schweiz" },
    { label: "Spanien", value: "Spanien" },
];

export const propertyOptions = [
    {label: "Urban Workspace Zürich"},
    {label: "Waldzauber Holzhütte"},
    {label: "Amsterdam Hausboot"},
    {label: "Villa Fiesta del Sol"},
    {label: "Nordseeparadies"},
    {label: "Alpenblick Chalet"},
    {label: "Pescara Panorama"},
    {label: "Kleine Waldnuss"},
    {label: "Villamartín"},
];

export enum AdditionalInfoType {
    KITCHEN = "kitchen",
    WIFI = "wifi",
    POOL = "pool",
    AIR_CONDITIONING = "airConditioning",
    PARKING = "parking",
    PET_FRIENDLY = "petFriendly"
}

export const fakeData: PropertyData[] = [
    {
        name: propertyOptions[0].label,
        address: "Dorfstrasse 8, 9835 Zürich, Schweiz",
        image: "/image/properties/property1.png",
        placeholderImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAMAAACejr5sAAABGlBMVEWqnYQXGhO9rZNcWEcRFA62p44rLCJ1a1aorK/i2MZBPy9LSDYFBwMcHhQgIBMnKBqxoolQT0Y0Niyxt7yjmIKHf217dWSZkH1gX1WDdWB2cWJlW0QMDQkgJB2eknx/dFyVi3mViXStoYillns3OS7Ht5yGg3+ZlIdVTTqgmozKuZ+Wm55rY0+HiIdtcXCan512c2xLQjC7rJW5qY/CsZfEtJtDQzi6vsOtqqWOgGg7PDKWkY6RkpdmYEyBeWlaUTdlZkaOh36PhG6IfGVZWlOOlJlVU0STlHWhpqKcqbPh07tCTCp+cFezqZmUl6Gro5V3dXZaUkZiZ2/CvLJydn9+fHuAf3xubFvSxrGdjnOCj5V1hY6vv8eRpbOETkNaAAAA+UlEQVQY0w3BhWKCABQAwEd3dygoioSis5XZte6O//+N7Q4wyghlFB0Qch3+RTOHWsEiqOmAZs3REO0TBBF97jwWKKM6Qusy6NWqBQMZttiCBdPSmStUm9C5dtka1tf59+8RXCtlmCat0RcTLW1a3OHrZw9m655h+iXdPU3pNHO8TtHFwHbfnj9eO0/ntWm3lS2PG7fHAak2ytvYLHphfjAIO9GNNgei2nivRWHcW3bi9XU7sU2TAkRCuGAbtL3dzUxprCSSVFlAKhXMo4rScTYPakUUJcHnAUcULDlTlEfs7oUUcJ/neR8QkRQ5bszO5/Z+zEqCgOP4H8ZuIQV5KBgvAAAAAElFTkSuQmCC",
        description: "Erleben Sie Zürich in unserer zentral gelegenen Wohnung, die perfekt für Work and Travel ausgestattet ist. Mit einem modernen Computer-Arbeitsplatz bietet diese Unterkunft alles, was Sie für produktives Arbeiten und entspanntes Wohnen benötigen. Genießen Sie die Nähe zu den kulturellen Highlights und den lebhaften Straßen der Stadt, ideal für Geschäftsreisende und digitale Nomaden.",
        type: PropertyType.APARTMENT,
        additionalInfos: [AdditionalInfoType.KITCHEN, AdditionalInfoType.WIFI, AdditionalInfoType.AIR_CONDITIONING, AdditionalInfoType.PARKING],
        numBeds: 1,
        numBathrooms: 1,
        area: 40,
        pricePerNight: 139,
        available: true,
    },
    {
        name: propertyOptions[1].label,
        address: "Britts Väg 91, 85490 Söderlöv, Schweden",
        image: "/image/properties/property3.png",
        placeholderImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAMAAACejr5sAAABdFBMVEUoPTkvQkJeamUzWEYZLS2ZpJhSV0w8QUJQWlx8inxCTk3Bx8UXNy4pR0KFlZC1wbg5S0giMzRRXmCos6m6wrQwOzmQoI1ab1mfrZxIZVVVZlhIWVZdWFK4vbGKo4ymqaeYoJSLl4pvc2yPnY6LlIo8V1GgpKdke2qrt6t5hoFwgXN4ioUzSEGxvay+yL3N1Mulr6NSX2ssTkAtNjssSj06TFRBTlTL0MYaJzCDj3t4iW2frKNnenJeX1dTW1dwiXOyt7prempJVVyvta1YY2J6c2eWmZFJUVertKpOUE8XIyKnr6tXhWqfoJyilolhb22+v75ueIJSXlodRjfLzdSgsqG2u8CCkoGAnIduenaUoJ6DmoKOl6EsO0Rce27W3cmHfmO9xby8xb9gf2NIUUaxuqxcUEGEiIeZprBbaVsqMTCBgnhfaXtTXGaIjpNkdWMrLyyaqJuYqY1zWERGfmFwaFnR19pJRz98bl17cWLT1tdHSEYuHQxjAAABCElEQVQY0wXBhWKCABQAwEeXiojYitjt7O7uWHf3XPd+fnegAitR4jc1ukjZt8E7iflCYWHdmzCI8UB4VxvybZ2KMrdgWAB1xuzgY3tBlKzU7f0RV1aWgKm82zu1/aAOcPzgbI1ozfpLQPK4X1MSNbQAiE3mlNbqBQV1SusnAtGwJJ10bFc3sn6loJAU2KJBH0Up6oJMUIPry6zFCulDrSVkTGdTEo48NF339qalChhyxBSYBn03ZB8zeWfX3rttA6Y26WNxE/2MzFy9Ie3pUm4GkmA6zuWc7VF9Ik/fXO4nMHgAE8znxsJk/vvJuQfTV4fDWkTBKEVI0vbx/dOpfP3V3sdjc6P6D6XULkXmtfvnAAAAAElFTkSuQmCC",
        description: "Entfliehen Sie dem Alltag und tauchen Sie ein in die Ruhe der schwedischen Natur mit unserer idyllischen Holzhütte im Herzen des Waldes. Diese gemütliche Unterkunft bietet Ihnen die perfekte Gelegenheit, sich zu entspannen und die unberührte Schönheit der Umgebung zu genießen. Ideal für Naturliebhaber und alle, die eine Auszeit in der Abgeschiedenheit suchen.",
        type: PropertyType.CABIN,
        additionalInfos: [AdditionalInfoType.KITCHEN, AdditionalInfoType.PARKING, AdditionalInfoType.PET_FRIENDLY],
        numBeds: 2,
        numBathrooms: 1,
        area: 40,
        pricePerNight: 120,
        available: true,
    },
    {
        name: propertyOptions[2].label,
        address: "Jasperplantsoen 618 I, 2975 IY Amsterdam, Niederlande",
        image: "/image/properties/property4.png",
        placeholderImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAMAAACejr5sAAABIFBMVEUBAwYWFRIhHBUeGRMcFRBdOh40JBVYNx5QMBs6KhsREhI8JxdHLRxYVUdQNiFaQCuEfG8oIBkMDhBNQjW2lnxDPTQ2MixjVEc+cGFtSStINCOFVC5hRS90UDFFMSMzKBtlSzcWGhiRg3ZJQC4GCQukmo6HgnRmXlBAMyqOfG5rY1lePyQsGhCKYkFnQiU1Hg9ybGVALRooKCB+UjBuXkxXSDtpT0FPTUMcIhlrV0iun45rVUUaBww4Oy50bltWY1BsKSSdn4uefWlHalyFTkE5TD2YbV6Vc19bT0Ovj3KKXDiilYpCSkaej4NkUEBGGxegpZUqQjYrUEU3WU0kKxF2cmt+eHGig2mse2txZTeFdWeKSBqmgGJyZkeXXDCpa0XBb3H+AAAA+klEQVQY0x3IVZKDQBQAwMcM7g4hQkKAEHd3z7q73f8Wu7VV/dWgXkRxZcNOHftxbZqlyefXWxGkIChXDquxnYxi82WwOb5HJ2i1VEc77XpOxQpe82Ku1P3+AEty+vP17VB5ei4fjoZ1s9r9gNEZ2bZqPbj7vbudLxbJbKZB0efkNuff3S+3rrssGxpfoGHQv56ODR5A1yHEAGStSUEpjq4mKg86QAiAEkagPShcDjsFHRE88cerK6mc5kNI6CGZyeY4OS9JGUWs0hgBybVp5rxLyZzXM2RREDBCILAUy6TrjQadMVOpag1jhEH8zzTFNPNn2axCYpIgfgGatyEv1dFvTgAAAABJRU5ErkJggg==",
        description: "Erleben Sie Amsterdam auf einzigartige Weise in unserem charmanten Hausboot, das direkt in der Innenstadt auf einem malerischen Fluss liegt. Genießen Sie die Nähe zu den kulturellen Highlights und den lebhaften Straßen der Stadt, während Sie die Ruhe und Gelassenheit des Wassers genießen. Ideal für einen unvergesslichen Aufenthalt in der niederländischen Hauptstadt.",
        type: PropertyType.HOUSE_BOAT,
        additionalInfos: [AdditionalInfoType.KITCHEN, AdditionalInfoType.AIR_CONDITIONING, AdditionalInfoType.PET_FRIENDLY],
        numBeds: 3,
        numBathrooms: 1,
        area: 20,
        pricePerNight: 169,
        available: true,
    },
    {
        name: propertyOptions[3].label,
        address: "Barrio Roser 5, 05962 Mataró, Spanien",
        image: "/image/properties/property2.png",
        placeholderImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAMAAACejr5sAAABuVBMVEWWtc0laHhmeYTTzsg4gMqQiYHv8O+ZdlyhwNmgiW1PIAiMlppqgIzV1tQgbHxgdYKHkZBjd4A7a3eIr9clUl5UWFc8RTNvjpOnim9GTj+fhWy1vcRxg4q5v8BCdYokdcfHycordYKgsrPn49gKaHu9vLa1sax8gnyhn5eCjI/p5+EgSVY0SFFyd3s4Z3JkcXmlmo4fQEtDiM84it3v7epEX2ZvhlimrJ+coaOrmoSAenCUjoVja2R6eHGnlHt3lJaOgnC2ubF5Z1OLqsCPsslbIgSkqaqira8meM56o8qTkIyvt7uetcWptrpigZJyiJK/y84uen7a2tZOgo3e3NextrrP0M4Zb8qYqLStp53e2dE8TViNrrRLfHMFZXpWj5xJaXRwfV43cXOwwdJ6g2BtfEA0eoB2mZ/p6u1CUCeJioexsK5wgTwlVWVDkN1tmsN2foIxhNlVoOaeudI7VS6IdFVdYFmJfGWUhG83YEI+VVtAUjWWmIZYIwlNVEFXKhETJxdlpdB6seKwy+V+gofG1uJwrNwkKyCNcFw5U05RV0d2YEugvNJ3c2WUnJ9kUkONiX9cfopsQixOvo60AAABDklEQVQY0x3Bg3bDABQA0Bd1yZq6KVKvXI3U9mzb6GzbxhevZ/dCULZHkuQ7/CvhQdxgaIHQVjRDqVQqimVZKl90yobxVtjcIXNXF+VyY93vZ4yT4R1tsBu6e5RcqtWvH2rFd6XCzY+0V+Hm9qFUzCqV2aryp5pL8gSDGh1EIufxhrrnwttXokCsmM1WPqzvR8WKs+N4JvWiSKeTPGzUYYfF1Xzt+uSIOgjLn3xMgrMRNh3MLlgdh3a/n0gxzL2nFiMwngYm55qWkSWp1OuVnm6vYdiYc8AIvZaJ6SmL0IS4NgJht8c4JOgTgEnYr0cQRCh3yQPumXF+s7izB/Rd3VqaRlGJBBX5RChfrBXRf0qGNhO0OLWPAAAAAElFTkSuQmCC",
        description: "Erleben Sie den ultimativen Luxus in unserer modernen Villa in Spanien, die mit einem beeindruckenden Pool ausgestattet ist. Diese exquisite Unterkunft ist perfekt für stilvolle Cocktailpartys und bietet Ihnen und Ihren Gästen ein unvergessliches Erlebnis. Genießen Sie die elegante Architektur und die erstklassigen Annehmlichkeiten in einer der begehrtesten Lagen Spaniens. Ideal für diejenigen, die das Leben in vollen Zügen genießen möchten.",
        type: PropertyType.VILLA,
        additionalInfos: [AdditionalInfoType.KITCHEN, AdditionalInfoType.WIFI, AdditionalInfoType.POOL, AdditionalInfoType.AIR_CONDITIONING, AdditionalInfoType.PARKING],
        numBeds: 8,
        numBathrooms: 4,
        area: 320,
        pricePerNight: 1500,
        available: true,
    },
    {
        name: propertyOptions[4].label,
        address: "Fritz-Erler-Str. 96a, 25938 Wyk auf Föhr, Deutschland",
        image: "/image/properties/property5.png",
        placeholderImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAMAAACejr5sAAABoVBMVEXw9ff2+/70+f2MeSmBc0ZyXzX7//8+MBPt8vXy9/mAcz9mURiqmIK5o4/6/P1+bkWghGl2aDxZRxFzZk7IqYaFdS+svz1kUi5lWDl1cy6tlHePezrHq2ju8/bQwm6TgSSDcCeZhi7Px3t6biS6m3lxWiXl6+Ty9vmznYZ0bVGkjGpdQRuGfT7RvGCbiCmoki+Ye2CQgFKZfjO8uHT0+fna0rZORhiZhziWclmSeFxwWTPFoXyFZDCitTiakEdgUBjQvIhVVEOjmIhoXC9sZSyvnlxJOBxHQiXSwp6ztklYWRiRmWxcYUyIcE6TiUHr8OqYkEvcymuTgC3e4eHd4cff3ajnwqXGooq0o2PT3d7Wq4y3oH67okF4eiS8qJKOYU1sRi5IKhlhRymFkDGVqjK1jm9LMhqPjzCFcVmFa1Gsj23MrIyndFSPdGbo69/y8uqMiDCyl2myj0DPv4HGp0m9pFDVtYG2mEC7nlKih0Hj1qGmp5TOrXxtdGl+YkCbjVGMgGFVSzPUvZianpnIwEzezaXk1LzEv0RlUji2rGhWRDFq1tf/AAABEUlEQVQY0x3IZXeCABQA0IeCKGKhiIoxuxu7nV3r7u7udh2/eju7Hy8IDQYAQBDB+ATCc4pEzsNoAP4TmRlzROctCI/jOEEsCMIhnohzkGXXnK0aE0il0qPbCzD6LcaRaRUpmSLlmcViA87O/RAMmExm2+SsSyLx7KUyquL1lR74tNWcUOnkoWQqpMO7J6eRm7/kD/BHPe6ScmN3n4kPlipZ9hKGfVprdmlnOyw/SKZprN5qsfeQj9D08sqmYmuh4jtOsL1870kPhAwltGvrObVa3cy178q6/usLEIxGo0DDKCqTYZrOQ6et/f4Au1gsruE4g2EKe4F6rDbfPt+BouIF76pS6U5jXrz+XPv56jZ+ASLzM4X1+IJBAAAAAElFTkSuQmCC",
        description: "Entdecken Sie die Schönheit der nordfriesischen Insel Föhr in unserem großen Haus mit traditionellem Reetdach, direkt am Fluss gelegen. Diese charmante Unterkunft bietet Ihnen eine perfekte Mischung aus traditionellem Charme und natürlicher Schönheit. Genießen Sie die friedliche Umgebung und die malerische Aussicht, ideal für einen erholsamen Urlaub inmitten der Natur.",
        type: PropertyType.HOUSE,
        additionalInfos: [AdditionalInfoType.KITCHEN, AdditionalInfoType.WIFI, AdditionalInfoType.PARKING, AdditionalInfoType.PET_FRIENDLY],
        numBeds: 6,
        numBathrooms: 2,
        area: 210,
        pricePerNight: 333,
        available: true,
    },
    {
        name: propertyOptions[5].label,
        address: "Lichtmattstrasse 43, 9050 Rüte, Schweiz",
        image: "/image/properties/property6.png",
        placeholderImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAMAAACejr5sAAAA6lBMVEUfIBg5QDNWVy8tMyZISistMSFOUjCSi1E1PS5cXTVERiZdYzkiJBw7PigxOCsyLSI6PCNqazQrLCMmKB5EPDA/QCAyNiRMTix2dUhSVTJ6eUCGgk0+RC9HQjgjHBTFvqx8fUN0cT7Fv5lYWDVESi1sakappG+ln2Wjl2JZWkIYGhRubUE5ST1CQxk9NyuspJJrZlVSTDRCTUfLxaFoYzpycUpiYkBgYCzNybWTkVJydC43NyJ+f0iKg1mJiE6cmUywqWdiWje1rWyelFq8smVZU0aTiHducDNNRT+wrH0rKha9t4dxblWYk1aNUK9HAAAA7UlEQVQY0w3KRXLDQBAAwFmQVsxMtoVmZqZw8v/vxNeuhr1J3ZHhq4qiaQJCSBjOh/AhbsxCoh4oRNASgXAaIuDarhmIvApgI0sgaomIDSMppEuxTfsAhLM4XpYFAPh2jbWIOUV/60E/SUgZepDpcFDFnjoG630y9ZTXPYBRUMngB7NMt7Lp16/3QgnCoCio2NHBSXUbV7NOWw7BZDepGgQJcpzUKfGmHUUR4ObB6tXKR+nnfGysZY7yGP7q6705d3YsPp6q5Sm4NbEEccye9+tPvsgXNc+63e4j8gEz9sy321arNblcdsezuffxP78ZGr3O5mMYAAAAAElFTkSuQmCC",
        description: "Entdecken Sie die Schönheit der Schweizer Alpen in unserem gemütlichen Alpenblick Chalet. Genießen Sie den atemberaubenden Ausblick auf die majestätischen Berge und die unberührte Natur. Die Hütte ist bequem mit dem Auto zu erreichen und bietet Ihnen eine perfekte Mischung aus Ruhe und Erholung. Ideal für Naturliebhaber und Abenteurer!",
        type: PropertyType.CABIN,
        additionalInfos: [AdditionalInfoType.KITCHEN, AdditionalInfoType.PARKING, AdditionalInfoType.PET_FRIENDLY],
        numBeds: 6,
        numBathrooms: 2,
        area: 290,
        pricePerNight: 419,
        available: true,
    },
    {
        name: propertyOptions[6].label,
        address: "Viale Ippocrate 126, 22030 Pescara, Italien",
        image: "/image/properties/property7.png",
        placeholderImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAMAAACejr5sAAABC1BMVEXOyL20qJnJwLXGva/Atqmsnoq7rZnAt6rBua6woIm+tKTRyb90X0q4q56kkn3LxbzNwrOmmIGsmoJpWEaBalK/sZ+wnIW8qJGVi4CGem2MjoPSzMJyZ1mxpZjOxLiuoZKij3yknZGik4KEgG5eTTiyq6Db7PVjUTuFb1uZiXdsVTpZQCXUzL+6r6J5ZVBsX1CUiHa0pIuAd2SRfmqqqJ/AvbObkoOQd2M/cXG/xsijjnPQ0c63wsahimy4vsGZlYxrcGKmpJuEhnSNdVxeSDItTkyanJHDrIxfYk6gqKyepJnc1cmspJm4ydSyvMLU4um32vLl+//q9fzW4uWx0ujNzMzL0daytrSEoZs6TcWpAAAA9ElEQVQY0xXJ1WKDQBQA0bvsskhwCRY0EG3c3eru7f9/SdN5PANZGUOkMQzGHMcRroMQCuH5jqVa6QI0jLEoxoagKApsn7Y2paJNEcvKBTsQdMWA188FnjiL9fpHKMs2Oi9BgPe3D1DpS61WWzn6Rq8aep/C9xcPRUfD4+OBFKPp7cCr3IC73z2kojsb9jxun+9Yy0wc8P3p9b3hy7/zE/UPaTyTMYKJ176aS5ZUPZ6WpZWKsjAikPVHw+rSMnNT2pRlgsZNN4a822hYra6RPCLCYJ6IqetB+9KUpFbiREGgQkn99xDq9V6l0rR5OBcEACrDc39cXBzyOxsM1wAAAABJRU5ErkJggg==",
        description: "Dieses stilvolle Apartment bietet einen atemberaubenden Meerblick, den Sie von Ihrem privaten Balkon aus genießen können. Der großzügige Wohnbereich lädt zum Entspannen und Verweilen ein. Erleben Sie die italienische Lebensart in einer der schönsten Küstenstädte Italiens.",
        type: PropertyType.APARTMENT,
        additionalInfos: [AdditionalInfoType.KITCHEN, AdditionalInfoType.WIFI, AdditionalInfoType.AIR_CONDITIONING],
        numBeds: 4,
        numBathrooms: 1,
        area: 110,
        pricePerNight: 390,
        available: true,
    },
    {
        name: propertyOptions[7].label,
        address: "Lietzenburger Wald, 67823 Hoßkirch, Deutschland",
        image: "/image/properties/property8.png",
        placeholderImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAMAAACejr5sAAAA2FBMVEUcHxgWGBMeIhsxOCsuNCZDTDooLiQiJR0pMyYnLCArMCQ9QzRJV0IkKSE0Ois2Pi8PEA5QWkdWYkozPC04RDNETkBHUUBPX0c+SDg6Qx8qLR5BSyV6hWx3e2o7JhtlLhVKVFREVTtAQi9ziVl+kGpugFdkdV1daVVobFVmYktFNyVkdUxQLBqKmXJcOCduRzTRj2mvuK6nqKBRJxOnUByZpY/p7u6QoH2hi3Owm46DlISdsIJGGAaCW0WISS1yeGGElWu8ysWisaWSm4zHz82bZ1Hd5eS7rJcnxTrQAAAA50lEQVQY0x3LV3KDMBRA0Ye6kIQMomMbx733mub07H9HYXI/z8yF2LhUh1Xn5/x52n1cnmb94QgMJzjMqtXXeX/93Z1W02A4AA+pJImK9vvte3vrhW8LPBoAQjaxtBjvN6/ba693WRAdAQKs89xNOuv18TjHd+rHMSAuNE2LPO126/qwnAmc5uABCS0ufMWhe3jeaCJ1Ch7nzNjKEDJf1i/tDMvYNTsgo6yREaXR4/hBsoA0OwLfB6CZmuhIWyGcD61Ww9Ij7Q6duiDMHFfkHzmDUiV9BdIXgmEDXhMLuERQlogJxwzif2N8FYTIW8D+AAAAAElFTkSuQmCC",
        description: "Erleben Sie die Natur hautnah in unserem einzigartigen Haselnuss Baumhaus, versteckt im Herzen des Waldes. Dieses charmante, haselnussförmige Baumhaus bietet Platz für eine Person und ist der perfekte Rückzugsort für alle, die Ruhe und Einsamkeit suchen. Lassen Sie sich von der friedlichen Umgebung und der Schönheit der Natur verzaubern!",
        type: PropertyType.CABIN,
        additionalInfos: [AdditionalInfoType.PARKING, AdditionalInfoType.PET_FRIENDLY],
        numBeds: 1,
        numBathrooms: 1,
        area: 10,
        pricePerNight: 190,
        available: true,
    },
    {
        name: propertyOptions[8].label,
        address: "Calle Proc. San Sebastián, 12596 Villamartín, Spanien",
        image: "/image/properties/property9.png",
        placeholderImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAMAAACejr5sAAABj1BMVEVObanq6elbe7N+v85ztsh4l8W5uLWQsdbn5eKLqtWIjYtvkMSrwt9hhLphgbZ8oc9df7dmh7tfsMNVdK7e39lHZaVue4ilnJYyna+iop+sr6manZycrrzAzuKIp9Jzn9KBqtVsl8ptuMptjL1Zd6+fttljt8hntMaOxM7Q1+Di4d/K2dTKy8parsCRlaDV08/b2tjZ19W5xMjBwLx/nsm/xchkcXl4jK2FnKJwj7yKwMVpr7nLyL60sa+ozsxEpbaxua6Rp7thssSjvNqWlJHY3Ny/zddrbm+psbebsMtwub6Qm6N3dGcJGhqEhYRkZl52d3eoqKKBkph5g4WDotDU3OaTuNyXr9O0zuhlib7BysmsyOSa0dmBmsan1deGoc2ImbjO2NNmrbmWjJJOX2yupKCev+CAiZuDnpTz8e+xu8JAWZ+Sj499hnyDf3xGUFT08e+2vL+XorGVtMJzjJVBYVujwchXf4mIrLyav8N3vMFAWGtesLdGlaJsfnhlpqw+TUChq5ucmY+uvs00OTkXhJXiAAABC0lEQVQY0w3EY2MCARgA4Ldzd9kXL9s2Fpdra7Ztq+GHr+fDA+IFRipBbKAE25lytlxktYLAyAiFIkQuRwBat8lkeoPBwbBoWFqRiBApnq5ThPogsL1lB5NR4LbjUqGk5WbbxHlDvRfjA2cym8Ukn+Tr6bdyVLWvOsJjMCE5Tkzq9b+jUVurpn1soDwHy2uCw0lz0BsOfzr9Tj5UvczfwGo8QsT70war++t2H8IK+kp3AURUqy3lvj/H40GvynqCdEKVAF+udvdceP34yr7PZwpe745CQYEnTEXunzQVTFbUaIroZnY34wJeqHmaSj3Way8Y6vTL1h0ODAPezMk1FSwd+yuoReayODH0HyqyMZmPUjGmAAAAAElFTkSuQmCC",
        description: "Tauchen Sie ein in puren Luxus mit unserer modernen Villa Villamartín in Spanien. Diese beeindruckende Villa verfügt über einen privaten Pool und drei großzügige Balkone, die ideale Plätze zum Entspannen und Sonnenbaden bieten. Die elegante Architektur und das stilvolle Design machen diese Villa zu einem perfekten Rückzugsort für anspruchsvolle Reisende. Erleben Sie Komfort und Luxus in einer atemberaubenden Umgebung!",
        type: PropertyType.VILLA,
        additionalInfos: [AdditionalInfoType.KITCHEN, AdditionalInfoType.WIFI, AdditionalInfoType.POOL, AdditionalInfoType.AIR_CONDITIONING, AdditionalInfoType.PARKING],
        numBeds: 6,
        numBathrooms: 3,
        area: 230,
        pricePerNight: 1100,
        available: true,
    },
]