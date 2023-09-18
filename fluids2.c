//#include <stdlib.h>
#include <unistd.h>

#include <fluidsynth.h>
#include <SDL2/SDL.h>

 
// Driver code
int main() {
 
// set variables and required pointers for fluidsynth
    int channel = 0;
    fluid_settings_t* fluidSettings = NULL;
    fluid_synth_t* synth = NULL;
    fluid_audio_driver_t* audioDriver = NULL;
 
            // initialize the SDL
        SDL_Init(SDL_INIT_AUDIO);
 
        // fluid synth pointers for settings, the required driver, loading the soundfont
        fluidSettings = new_fluid_settings();
        synth = new_fluid_synth(fluidSettings);
        fluid_settings_setstr(fluidSettings, "audio.driver", "alsa");
        audioDriver = new_fluid_audio_driver(fluidSettings, synth);
        fluid_synth_sfload(synth, "TimGM6mb.sf2", 1);
        fluid_synth_set_gain(synth, 5.0);
        //fluid_synth_program_change(synth,0,000);
 
 
	//unsigned int microSecond;
	//while(1){
		//n = recvfrom(sockfd, (int*)buff,4,MSG_WAITALL, ( struct sockaddr *) &cliaddr,&len);
		//if(*buff==-1) break;
		//cout<<buffer;
		int n;
        	scanf("%d",&n);
		fluid_synth_noteon(synth, 0, n, 127);
		//microSecond = 100000;
        	//usleep(0.5*microSecond);
        	sleep(1);
        	fluid_synth_noteoff(synth, 0, n);
	//}
	// release the drivers.
    delete_fluid_audio_driver(audioDriver);
    delete_fluid_synth(synth);
    delete_fluid_settings(fluidSettings);
    SDL_Quit();	
	return 0;
}
