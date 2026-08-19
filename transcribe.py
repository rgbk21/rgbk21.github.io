import whisper

# Load the model
# C:\Users\rajga\.cache\whisper
model = whisper.load_model("large-v3")

# Transcribe the audio with a mixed-language prompt
result = model.transcribe(
    r"C:\MY_BACKUP\LearningStuff\Polish\A1_2\Recordings\Lecture16_18thAugust\Lecture16_18thAugust.mp3",
    task="transcribe",
    language="pl",  # FORCE POLISH: Stops Whisper from auto-detecting English and translating everything
    # Priming the model with both languages activates both dictionaries
    prompt="Ta lekcja jest po polsku and partly in English to explain technical concepts smoothly.",
    verbose=True
)

# Define where you want to save the text file
output_file_path = r"Lectures/Polish/A1_2/L16_18thAugust/L16_18thAugust.txt"

# Open the file in write mode ('w') with UTF-8 encoding and save the text
with open(output_file_path, "w", encoding="utf-8") as f:
    f.write(result["text"])

print(f"\nSuccess! Transcription saved to: {output_file_path}")
