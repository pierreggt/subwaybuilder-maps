(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Muscat Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro linking Muscat International Airport to Old Muscat along the coastal corridor.',
            notification: 'Welcome to Muscat!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro reliant l\'aeroport international de Mascate a la vieille ville le long du corridor cotier.',
            notification: 'Bienvenue a Mascate !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Muscat',
        code: 'MCT',
        description: t('description'),
        population: 592400,
        initialViewState: { zoom: 12, latitude: 23.60, longitude: 58.40, bearing: 0 }
    });

    api.cities.registerTab({ id: 'oman-mct', label: 'Oman', cityCodes: ['MCT'] });

    api.map.setTileURLOverride({
        cityCode: 'MCT',
        tilesUrl: 'http://127.0.0.1:8080/MCT/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/MCT_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('MCT', {
        buildingsIndex: '/data/MCT/buildings_index.bin.gz',
        demandData: '/data/MCT/demand_data.json.gz',
        roads: '/data/MCT/roads.geojson.gz',
        runwaysTaxiways: '/data/MCT/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/MCT/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/MCT/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'MCT') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Muscat mod loaded successfully!');
})();
