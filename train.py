import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader
import os

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
BATCH_SIZE = 32
EPOCHS = 5
IMG_SIZE = 224

print("Device:", DEVICE)

# Local dataset paths
DATA_DIR = "./dataset"
TRAIN_DIR = os.path.join(DATA_DIR, "entrainement")
TEST_DIR = os.path.join(DATA_DIR, "test")

# Image transforms
transform = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.RandomHorizontalFlip(),
    transforms.ToTensor(),
])

# Datasets
train_dataset = datasets.ImageFolder(TRAIN_DIR, transform=transform)
test_dataset = datasets.ImageFolder(TEST_DIR, transform=transform)

class_names = train_dataset.classes
num_classes = len(class_names)

print("Classes:", class_names)

# Dataloaders
train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=BATCH_SIZE)

# Model (Transfer Learning ResNet18)
model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)

# Freeze backbone
for p in model.parameters():
    p.requires_grad = False

# Replace classifier
model.fc = nn.Linear(model.fc.in_features, num_classes)
model = model.to(DEVICE)

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.fc.parameters(), lr=0.001)

# Training loop
for epoch in range(EPOCHS):
    model.train()
    running_loss = 0

    for images, labels in train_loader:
        images, labels = images.to(DEVICE), labels.to(DEVICE)

        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item()

    print(f"Epoch {epoch+1}/{EPOCHS} - Loss: {running_loss:.4f}")

# Save model
os.makedirs("model", exist_ok=True)

torch.save({
    "model_state": model.state_dict(),
    "classes": class_names
}, "model/waste_model.pt")

print("Model saved to model/waste_model.pt")
