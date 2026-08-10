(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Baghdad Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro Iraq\'s capital deserves, from the airport to Sadr City and Kadhimiya.',
            notification: 'Welcome to Baghdad!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro que merite la capitale irakienne, de l\'aeroport a la ville de Sadr et Kadhimiya.',
            notification: 'Bienvenue a Bagdad !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Baghdad',
        code: 'BGD',
        description: t('description'),
        population: 3161500,
        initialViewState: { zoom: 10, latitude: 33.3152, longitude: 44.3661, bearing: 0 }
    });

    api.cities.registerTab({ id: 'iraq-bgd', label: 'Iraq', cityCodes: ['BGD'] });

    api.map.setTileURLOverride({
        cityCode: 'BGD',
        tilesUrl: 'http://127.0.0.1:8080/BGD/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/BGD_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('BGD', {
        buildingsIndex: '/data/BGD/buildings_index.bin.gz',
        demandData: '/data/BGD/demand_data.json.gz',
        roads: '/data/BGD/roads.geojson.gz',
        runwaysTaxiways: '/data/BGD/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/BGD/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/BGD/ocean_depth_index_contours.json.gz'
    });

    api.map.setLayerOverride({
        layerId: 'parks-large',
        sourceLayer: 'landuse',
        filter: ['in', ['get', 'kind'], ['literal',
            ['park','garden','nature_reserve','grass','cemetery','golf_course',
             'forest','wood','meadow','village_green','recreation_ground','pitch','zoo','allotments']]]
    });

    api.map.setLayerOverride({
        layerId: 'airports',
        sourceLayer: 'landuse',
        filter: ['==', ['get', 'kind'], 'aerodrome']
    });

    api.hooks.onCityLoad(function(cityCode) {
        if (cityCode === 'BGD') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Baghdad mod loaded successfully!');
})();
